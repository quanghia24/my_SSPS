import { NavLink } from 'react-router-dom'
import {
  IoDocumentTextOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoTimeOutline,
  IoWalletOutline,
} from 'react-icons/io5'
import { IoPrintOutline } from 'react-icons/io5'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

function LeftSideBar() {
  const [expand, setExpand] = useState(() => {
    const savedExpand = localStorage.getItem('expand')
    return savedExpand === 'true'
  })

  const toggle = () => {
    setExpand((prevExpand) => {
      const newExpand = !prevExpand
      localStorage.setItem('expand', newExpand)
      return newExpand
    })
  }

  return (
    <div>
      <div
        className="flex flex-col h-screen w-[250px] border-r border-black"
        style={{ background: 'rgba(235, 244, 255, 1)', height: '80vh' }}
      >
        <div className="">
          <NavLink
            to="/admin_home"
            end
            className={({ isActive }) => {
              const active = isActive
                ? 'bg-blue-500 text-white'
                : 'bg-rgba(235, 244, 255, 1) text-black'
              return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
            }}
          >
            <div className="flex items-center">
              <div className="w-7 h-7 mr-3">
                <IoHomeOutline className="w-full h-full" />
              </div>
              <span className="font-semibold no-underline text-2xl">
                Trang chủ
              </span>
            </div>
          </NavLink>
          <NavLink
            onClick={toggle}
            to="/admin_home/printInformation"
            className={({ isActive }) => {
              const active = isActive
                ? 'bg-blue-500 text-white'
                : 'bg-rgba(235, 244, 255, 1) text-black'
              return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="w-7 h-7 mr-3">
                  <IoPrintOutline className="w-full h-full" />
                </div>
                <span className="font-semibold no-underline text-2xl">
                  Máy In
                </span>
              </div>
              <button>{expand ? <FaChevronDown /> : <FaChevronUp />}</button>
            </div>
          </NavLink>
          {expand && (
            <>
              <NavLink
                to="/admin_home/printInformation"
                className={({ isActive }) => {
                  const active = isActive
                    ? 'bg-blue-300 text-black'
                    : 'bg-rgba(235, 244, 255, 1) text-black'
                  return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
                }}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 mr-3">
                    <IoInformationCircleOutline className="w-full h-full" />
                  </div>
                  <span className="font-semibold no-underline text-2xl text-center w-full">
                    Thông tin
                  </span>
                </div>
              </NavLink>
              <NavLink
                to="/admin_home/printStatus"
                className={({ isActive }) => {
                  const active = isActive
                    ? 'bg-blue-300 text-black'
                    : 'bg-rgba(235, 244, 255, 1) text-black'
                  return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
                }}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 mr-3">
                    <IoSettingsOutline className="w-full h-full" />
                  </div>
                  <span className="font-semibold no-underline text-2xl text-center w-full">
                    Trạng thái
                  </span>
                </div>
              </NavLink>
            </>
          )}
          {/* <NavLink to='/admin_home/printStatus' className={({ isActive }) => {
            const active = isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
            return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
          }}>
            <div className='flex items-center'>
                <div className='w-7 h-7 mr-3'>
                  <IoSettingsOutline className='w-full h-full' />
              </div>
              <span className='font-semibold no-underline text-2xl'>Cấu hình</span>
            </div>
          </NavLink> */}

          <NavLink
            to="/admin_home/list_feedback"
            end
            className={({ isActive }) => {
              const active = isActive
                ? 'bg-blue-500 text-white'
                : 'bg-rgba(235, 244, 255, 1) text-black'
              return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
            }}
          >
            <div className="flex items-center">
              <div className="w-7 h-7 mr-3">
                <IoDocumentTextOutline className="w-full h-full" />
              </div>
              <span className="font-semibold no-underline text-2xl">
                Phản hồi
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/admin_home/history"
            end
            className={({ isActive }) => {
              const active = isActive
                ? 'bg-blue-500 text-white'
                : 'bg-rgba(235, 244, 255, 1) text-black'
              return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
            }}
          >
            <div className="flex items-center">
              <div className="w-7 h-7 mr-3">
                <IoTimeOutline className="w-full h-full" />
              </div>
              <span className="font-semibold no-underline text-2xl">
                Lịch sử in
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/admin_home/admin_payment"
            end
            className={({ isActive }) => {
              const active = isActive
                ? 'bg-blue-500 text-white'
                : 'bg-rgba(235, 244, 255, 1) text-black'
              return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
            }}
          >
            <div className="flex items-center">
              <div className="w-7 h-7 mr-3">
                <IoWalletOutline className="w-full h-full" />
              </div>
              <span className="font-semibold no-underline text-2xl">
                Thanh toán
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/admin_home/users"
            end
            className={({ isActive }) => {
              const active = isActive
                ? 'bg-blue-500 text-white'
                : 'bg-rgba(235, 244, 255, 1) text-black'
              return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
            }}
          >
            <div className="flex items-center">
              <div className="w-7 h-7 mr-3">
                <IoPersonOutline className="w-full h-full" />
              </div>
              <span className="font-semibold no-underline text-2xl">
                Người dùng
              </span>
            </div>
          </NavLink>

          <NavLink
            to="/admin_home/printing_imple"
            end
            className={({ isActive }) => {
              const active = isActive
                ? 'bg-blue-500 text-white'
                : 'bg-rgba(235, 244, 255, 1 text-black'
              return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
            }}
          >
            <div className="flex items-center">
              <div className="w-7 h-7 mr-3">
                <IoWalletOutline className="w-full h-full" />
              </div>
              <span className="font-semibold no-underline text-2xl">
                Thiết lập
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
