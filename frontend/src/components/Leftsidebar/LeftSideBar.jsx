import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoPrintOutline } from "react-icons/io5";
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

function LeftSideBar() {
  const [expand, setExpand] = useState(() => {
    const savedExpand = localStorage.getItem('expand');
    return savedExpand === 'true'; 
  });
  
  const toggle = () => {
    setExpand((prevExpand) => {
      const newExpand = !prevExpand;
      localStorage.setItem('expand', newExpand); 
      return newExpand;
    });
  };

  return (
    <div>
      <div className="flex flex-col h-screen w-[250px] border-r border-black">
        <div className="">
          <NavLink to='/' end className={({ isActive }) => {
            const active = isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
            return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
          }}>
            <div className='flex items-center'>
                <div className='w-7 h-7 mr-3'>
                  <IoHomeOutline className='w-full h-full' />
              </div>
              <span className='font-semibold no-underline text-2xl'>Trang chủ</span>
            </div>
          </NavLink>
          <NavLink  onClick={toggle} to='/admin/printInformation' className={({ isActive }) => {
            const active = isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
            return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
          }}>
            <div className="flex items-center justify-between w-full">
              <div className='flex items-center'>
                  <div className='w-7 h-7 mr-3'>
                    <IoPrintOutline className='w-full h-full' />
                </div>
                <span className='font-semibold no-underline text-2xl'>Máy In</span>
              </div>
              <button>
                {expand ?  <FaChevronDown /> : <FaChevronUp />}
              </button>
            </div>
          </NavLink>
          {expand && (
            <>
              <NavLink to='/admin/printInformation' className={({ isActive }) => {
                const active = isActive ? 'bg-blue-300 text-black' : 'bg-white text-black'
                return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
              }}>
                    <span className='font-semibold no-underline text-2xl text-center w-full'>Thông tin</span>             
              </NavLink>
              <NavLink to='/admin/printStatus' className={({ isActive }) => {
                const active = isActive ? 'bg-blue-300 text-black' : 'bg-white text-black'
                return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
              }}>
                    <span className='font-semibold no-underline text-2xl text-center w-full'>Trạng thái</span>             
              </NavLink>
            </>

          )}
          <NavLink to='/a' className={({ isActive }) => {
            const active = isActive ? 'bg-blue-500 text-white' : 'bg-white text-black'
            return `${active} w-full no-underline px-3 py-3 border-b border-black flex justify-between items-center`
          }}>
            <div className='flex items-center'>
                <div className='w-7 h-7 mr-3'>
                  <IoPrintOutline className='w-full h-full' />
              </div>
              <span className='font-semibold no-underline text-2xl'>Cấu hình</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar
