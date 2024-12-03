import React from 'react'
import LeftSideBar from '../Leftsidebar/LeftSideBar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Swal from 'sweetalert2'

function PrintingInformation() {
  const [print, setPrint] = useState([])
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const createInformation = async (data) => {
    try {
      const access = localStorage.getItem('access')

      await axios.post(
        'http://127.0.0.1:8000/api/printers/',
        {
          model: data.model,
          brand: data.brand,
          location: data.location,
          allowed_types: data.allowed_types,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      getPrint()
      toggleAddFormVisibility(false)
      toast.success('Tạo thành công')
    } catch (err) {
      toast.error('Create fail!!!')
      console.log(err)
    }
  }

  const toggleAddFormVisibility = () => {
    setIsAddFormVisible(true)
    reset({
      model: '',
      brand: '',
      location: '',
      allowed_types: '',
      active: '',
    })
  }

  const toggleCloseForm = () => {
    setIsAddFormVisible(false)
    reset({
      model: '',
      brand: '',
      location: '',
      allowed_types: '',
      active: '',
    })
  }

  const updateInformation = async (data) => {
    try {
      const access = localStorage.getItem('access')
      const id = localStorage.getItem('printId')

      await axios.put(
        'http://127.0.0.1:8000/api/printers/',
        {
          id: id,
          model: data.model,
          brand: data.brand,
          location: data.location,
          allowed_types: data.allowed_types,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      getPrint()
      setIsEditFormVisible(false)
      setIsAddFormVisible(false)
      toast.success('Update thành công')
    } catch (err) {
      toast.error('Create fail!!!')
      console.log(err)
    }
  }

  const toggleEditFormVisibility = (print) => {
    localStorage.setItem('printId', print?.id)
    setIsEditFormVisible(!isEditFormVisible)
    reset({
      model: print.model,
      brand: print.brand,
      location: print.location,
      allowed_types: print.allowed_types,
      status: print.status,
    })
  }

  const getPrint = async () => {
    try {
      const access = localStorage.getItem('access')
      const res = await axios.get('http://127.0.0.1:8000/api/printers/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      setPrint(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPrint()
  }, [])

  const deletePrint = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })

    if (!isConfirmed) {
      return
    }
    try {
      const access = localStorage.getItem('access')
      await axios.delete(`http://127.0.0.1:8000/api/printers/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      getPrint()
      toast.success('Xóa thành công')
    } catch (error) {
      console.error(error)
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: '100' },
    { field: 'model', headerName: 'Hãng', flex: 0.4 },
    { field: 'brand', headerName: 'Mẫu mã', flex: 0.5 },
    { field: 'location', headerName: 'Tòa', flex: 0.3 },
    { field: 'status', headerName: 'Trạng thái', flex: 0.3 },
    { field: 'allowed_types', headerName: 'allowed_types', flex: 0.3 },
    {
      field: 'action',
      headerName: 'Hành động',
      headerClassName: 'font-bold',
      renderCell: (params) => (
        <div className="flex h-full justify-center items-center">
          <button
            onClick={() => toggleEditFormVisibility(params.row)}
            className=" p-1 hover:bg-green-500 text-green-500 hover:text-white  rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7"
            >
              <path
                d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 
                    2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 
                    2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
              />
              <path
                d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 
                    3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 
                    1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
              />
            </svg>
          </button>
          <button
            onClick={() => deletePrint(params.row.id)}
            className=" p-1 hover:bg-red-500 text-red-600 hover:text-white  rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7 "
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="h-screen flex">
        <div className="w-full">
          <div>
            <div className="text-4xl w-80 font-semibold shadow-xl rounded-br-lg p-3 border border-black">
              Thông tin máy in
            </div>
          </div>
          <div className="w-full px-[25px] py-20">
            <button
              onClick={() => toggleAddFormVisibility()}
              className="no-underline w-70 font-semibold flex items-center gap-3 justify-center bg-blue-500 rounded-lg p-3 mb-3"
            >
              <FaPlus />
              <div className="text-xl">Thêm máy in</div>
            </button>
            <Paper sx={{ height: 700, width: '100%' }}>
              <DataGrid
                rows={print}
                columns={columns}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                rowHeight={80}
                checkboxSelection
                disableExtendRowFullWidth
                getRowId={(row) => row.id}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f5f5f5',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  '& .MuiTablePagination-displayedRows': {
                    margin: 0,
                  },
                  '& .MuiTablePagination-selectLabel': {
                    margin: 0,
                  },
                }}
              />
            </Paper>
          </div>
        </div>
      </div>
      {isAddFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-40">
          <div className="bg-white min-w-[80vh] m-auto p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(createInformation)} noValidate>
              <div className="flex justify-between mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={() => {
                    toggleCloseForm()
                  }}
                  className="size-10 text-red-500 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10 text-green-500 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="mb-3 text-xl lg:text-2xl font-bold">
                Add a information
              </h3>
              <div className="grid grid-cols-2 grid-rows-3 gap-6">
                <div className="mb-4 relative col-span-1">
                  <label className="absolute -top-[12px] text-lg left-3 text-red-500 bg-white font-semibold">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="Enter model"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('model', {
                      required: 'Model is required',
                    })}
                  />
                  {errors.model && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.model.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 relative col-span-1">
                  <label className="absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 bg-white font-semibold">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="Enter brand"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('brand', {
                      required: 'Brand is required',
                    })}
                  />
                  {errors.brand && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 relative col-span-1">
                  <label className="absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 bg-white font-semibold">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('location', {
                      required: 'Location is required',
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 relative col-span-1">
                  <label className="absolute -top-[12px] text-lg left-3 text-red-500 bg-white font-semibold">
                    Allowed types
                  </label>
                  <input
                    type="text"
                    placeholder="Enter allowed types"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('allowed_types', {
                      required: 'Allowed types is required',
                    })}
                  />
                  {errors.allowed_types && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.allowed_types.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 relative col-span-1">
                  <label className="absolute -top-[12px] text-lg left-3 text-red-500 bg-white font-semibold">
                    Status
                  </label>
                  <input
                    className="w-full py-4 px-2 text-lg bg-white text-black border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('status', { required: 'Status is required' })}
                  />
                  {errors.status && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-40">
          <div className="bg-white min-w-[80vh] m-auto p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(updateInformation)} noValidate>
              <div className="flex justify-between mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={() => {
                    toggleEditFormVisibility(false)
                  }}
                  className="size-10 text-red-500 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-10 text-green-500 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="mb-3 text-xl lg:text-2xl font-bold">
                Update a information
              </h3>
              <div className="grid grid-cols-2 grid-rows-3 gap-6">
                <div className="mb-4 relative col-span-1">
                  <label className="absolute -top-[12px] text-lg left-3 text-red-500 bg-white font-semibold">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="Enter model"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('model', {
                      required: 'Model is required',
                    })}
                  />
                  {errors.model && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.model.message}
                    </p>
                  )}
                </div>
                <div className="mb-4 relative col-span-1">
                  <label className="absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 bg-white font-semibold">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="Enter brand"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('brand', {
                      required: 'Brand is required',
                    })}
                  />
                  {errors.brand && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.brand.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 relative col-span-1">
                  <label className="absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 bg-white font-semibold">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('location', {
                      required: 'Location is required',
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 relative col-span-1">
                  <label className="absolute -top-[12px] text-lg left-3 text-red-500 bg-white font-semibold">
                    Allowed types
                  </label>
                  <input
                    type="text"
                    placeholder="Enter allowed types"
                    className="w-full p-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('allowed_types', {
                      required: 'Allowed types is required',
                    })}
                  />
                  {errors.allowed_types && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.allowed_types.message}
                    </p>
                  )}
                </div>
                <div className="mb-2 relative col-span-1">
                  <label className="absolute -top-[12px] text-lg left-3 text-red-500 bg-white font-semibold">
                    Active
                  </label>
                  <input
                    className="w-full py-3 px-2 text-lg bg-white border border-black rounded-lg focus:outline-none transition-colors duration-200"
                    {...register('status', { required: 'Status is required' })}
                  />
                  {errors.status && (
                    <p className="text-red-500 absolute lg:text-lg text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrintingInformation
