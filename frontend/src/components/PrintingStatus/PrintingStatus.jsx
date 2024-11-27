import React from 'react'
import LeftSideBar from '../Leftsidebar/LeftSideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'

function PrintingStatus() {
  const [status, setStatus] = useState([])

  const data = [
    {
        id: 1,
        abc: '106H6',
        Trangthai: 'Sẵn sàng',
        giay: '15',
        hieusuat: '30',
        phong: 101,
        muc: 30,
    },
    {
        id: 2,
        abc: '104A3',
        Trangthai: 'Đang in',
        giay: '10',
        hieusuat: '30',
        phong: 101,
        muc: 60,
    },
    {
        id: 3,
        abc: '101A5',
        Trangthai: 'Lỗi',
        giay: '10',
        hieusuat: '30',
        phong: 101,
        muc: 0,      
    },
    {
        id: 4,
        abc: '101A5',
        Trangthai: 'Ngoại tuyến',
        giay: '10',
        hieusuat: '30',
        phong: 101,
        muc: 10,
    },
    {
        id: 5,
        abc: '101A5',
        Trangthai: 'Lỗi',
        giay: '10',
        hieusuat: '30',
      phong: 101,
      muc: 20,
    },
    {
        id: 6,
        abc: '101A5',
        Trangthai: 'Lỗi',
        giay: '10',
        hieusuat: '30',
        phong: 101,
        muc: 40,
    },
    {
      id: 7,
      abc: '102C5',
      Trangthai: 'Sẵn sàng',
      giay: '10',
      hieusuat: '30',
      phong: 111,
      muc: 80,
    }
  ]

  const getStatus = async () => {
    try {
      const access = localStorage.getItem('access')         
      const res = await axios.get('http://127.0.0.1:8000/api/printers/', {
        headers: {
          Authorization: `Bearer ${access}`
        }
      })
      setStatus(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
}

useEffect(() => {
    getStatus()
}, [])
  return (
    <div>       
        <div className='h-screen flex'>
          {/* <LeftSideBar /> */}
          <div className="w-full">
            <div>
              <div className='text-4xl w-80 font-semibold shadow-xl rounded-br-lg p-3 border border-black'>
                  Trạng thái máy
              </div>                 
            </div>
          <div className='grid grid-cols-4 gap-5 px-20 py-10'>
            {data.map((a) => (
              <div key={a.id} className='flex flex-col justify-center items-center border border-black rounded-xl'>
                <div className={`text-3xl text-center font-semibold text-white w-full py-2
                  ${a.Trangthai === 'Lỗi' ? 'bg-red-500' : a.Trangthai === 'Đang in' ? 'bg-blue-500' : a.Trangthai === 'Ngoại tuyến' ? 'bg-gray-500' : 'bg-green-500'}`}>
                  {a.abc}
                </div>
                  <div className='flex gap-3 mt-2'>
                  <div className='font-bold'>Trạng thái:</div>
                  <div className={`font-bold ${a.Trangthai === 'Lỗi' ? 'text-red-500' : a.Trangthai === 'Đang in' ? 'text-blue-500' : a.Trangthai === 'Ngoại tuyến' ? 'text-gray-500' : 'text-green-500'}`}>{a.Trangthai}</div>
                </div>
                <div className='flex gap-3 mt-3'>
                  <div className='flex gap-2'>
                    <div className='flex flex-col items-center font-semibold'>
                      <div>
                        Số lượng giấy còn lại
                      </div>
                      <div className='text-3xl'>
                        {a.giay}
                      </div>
                    </div>
                    <div className='flex flex-col items-center font-semibold'>
                      <div >
                        Hiệu suất
                      </div>
                      <div className='text-3xl'>
                        {a.hieusuat}%
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-6 flex justify-between items-center gap-2 w-full px-20'>
                  <div>Mực:</div>
                  <div className="progress w-full">
                    <div className={`progress-bar ${a.muc <= 15 ? 'bg-danger' : a.muc > 15 && a.muc <= 50 ? 'bg-warning' : 'bg-success'}`} role="progressbar" style={{ width: `${a.muc}%` }} aria-valuenow={a.muc} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                </div>
                <button className='mt-2 text-white px-10 text-lg py-1 bg-green-500 rounded-2xl mb-3'>Bật</button>
              </div>
            ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default PrintingStatus
