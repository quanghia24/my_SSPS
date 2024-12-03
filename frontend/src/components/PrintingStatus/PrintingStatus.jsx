import React from 'react'
import LeftSideBar from '../Leftsidebar/LeftSideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function PrintingStatus() {
  const [status, setStatus] = useState([])
  const [paper, setPaper] = useState([])
  const [paperId, setPaperId] = useState([])

  const getPaper = async () => {
    try {
      const access = localStorage.getItem('access')
      const res = await axios.get('http://127.0.0.1:8000/api/users/paper/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      setPaper(res.data.amount)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPaper()
  }, [])

  const getPaperId = async (id) => {
    try {
      const access = localStorage.getItem('access')
      const res = await axios.get(`http://127.0.0.1:8000/api/printers/${id}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      const paperCount = paper - res.data?.printed_papers
      setStatus((prevStatus) =>
        prevStatus.map((item) =>
          item.id === id ? { ...item, paperCount } : item,
        ),
      )
    } catch (error) {
      // console.error(error)
    }
  }

  useEffect(() => {
    status.forEach((statuss) => {
      getPaperId(statuss.id)
    })
  }, [status])

  const getStatus = async () => {
    try {
      const access = localStorage.getItem('access')
      const res = await axios.get('http://127.0.0.1:8000/api/printers/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      setStatus(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStatus()
  }, [])

  const updateStatus = async (id, currentStatus) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed!',
    })

    if (!isConfirmed) {
      return
    }

    try {
      const access = localStorage.getItem('access')
      const newStatus = currentStatus === 'inactive' ? 'active' : 'inactive'
      await axios.patch(
        'http://127.0.0.1:8000/api/printers/',
        {
          id: id,
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      getStatus()
      console.log('aaa', id)
      toast.success('Status updated successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update status!')
    }
  }

  return (
    <div>
      <div className="h-screen flex">
        <div className="w-full">
          <div>
            <div className="text-4xl w-80 font-semibold shadow-xl rounded-br-lg p-3 border border-black">
              Trạng thái máy
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5 px-20 py-10">
            {status.map((a) => (
              <div
                key={a.id}
                className="flex flex-col justify-center items-center border border-black rounded-xl"
              >
                <div
                  className={`text-3xl text-center font-semibold text-white w-full py-2
                  ${a.status === 'inactive' ? 'bg-red-500' : 'bg-blue-600'}`}
                >
                  {a.location}
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="font-bold">Trạng thái:</div>
                  <div
                    className={`font-bold ${
                      a.status === 'inactive' ? 'text-red-500' : 'text-blue-600'
                    }`}
                  >
                    {a.status}
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center font-semibold">
                      <div>Số lượng giấy còn lại</div>
                      <div className="text-3xl">
                        {a.paperCount !== undefined ? a.paperCount : '0'}
                      </div>
                    </div>
                    <div className="flex flex-col items-center font-semibold">
                      <div>Hiệu suất</div>
                      <div className="text-3xl">
                        {a.paperCount !== undefined
                          ? Math.floor((a.paperCount / paper) * 100)
                          : '0'}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between items-center gap-2 w-full px-20">
                  <div>Mực:</div>
                  <div className="progress w-full">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{
                        width: `${
                          a.paperCount !== undefined
                            ? (a.paperCount / paper) * 100
                            : '0%'
                        }%`,
                      }}
                      aria-valuenow={
                        a.paperCount !== undefined
                          ? (a.paperCount / paper) * 100
                          : '0'
                      }
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={() => updateStatus(a.id, a.status)}
                  className={`mt-2 text-white ${
                    a.status === 'inactive' ? ' bg-green-500' : 'bg-blue-500'
                  } px-10 text-lg py-1 rounded-2xl mb-3`}
                >
                  {a.status === 'inactive' ? 'Bật' : 'Tắt'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintingStatus
