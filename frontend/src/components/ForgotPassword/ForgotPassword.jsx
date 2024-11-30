import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image.png";
import image from "../../assets/image (1).png";
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const getToken = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/password-reset/')

      const html = response.data
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const csrfInput = doc.querySelector('input[name=csrfmiddlewaretoken]')
      if (!csrfInput) {
        throw new Error('No CSRF input found')
      }
      const csrfToken = csrfInput.value
      localStorage.setItem('a', csrfToken)
      console.log(csrfToken)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  const forgotPassword = async (data) => {
    try {
      const a = localStorage.getItem('a')
      const response2 = await axios.post(
        'http://127.0.0.1:8000/password-reset/',
        {
          email: data.email,
        },
        {
          headers: {
            'X-CSRFToken': a,
          },
        }
      )
      toast.success('Đã gửi thành công. Vui lòng kiểm tra email của bạn!!')
      localStorage.setItem('email', data.email)
      window.location.href = '/password-reset-form'
    } catch (err) {
      toast.error('Gửi fail!!')
      console.log(err)
    }
  }

  return (
    <div>
      <div className="bg-blue-100 p-20 flex gap-20">
        <div className="w-full pt-40 pl-20">
          <form
            onClick={handleSubmit(forgotPassword)}
            className="border border-black rounded-lg flex flex-col justify-center items-center py-4 px-24"
          >
            <div className="">
              <img src={logo} alt="" className="w-[100px] h-[100px]" />
            </div>
            <div className="text-3xl mt-2 font-bold">QUÊN MẬT KHẨU</div>
            <div className="w-full">
              <div className="relative w-full mt-8 bg-gray-200 rounded-lg">
                <div className="rounded-xl px-3 flex w-full gap-4 relative">
                  <svg
                    width={30}
                    height={24}
                    viewBox="0 0 30 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-[35px]"
                  >
                    <path
                      d="M27 0H3C1.35 0 0.015 1.35 0.015 3L0 21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V3C30 1.35 28.65 0 27 0ZM27 6L15 13.5L3 6V3L15 10.5L27 3V6Z"
                      fill="black"
                    />
                  </svg>
                  <div className="flex flex-col w-full py-3">
                    <div className="text-lg">Email</div>
                    <input
                      type="text"
                      placeholder="example@hcmut.edu.vn"
                      className="border-none outline-none w-full text-black font-bold placeholder:text-black placeholder:opacity-60 bg-gray-200"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@hcmut\.edu\.vn$/,
                          message: 'Email is inValid',
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 absolute top-20 text-lg">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <Link
                to={-1}
                className="bg-red-500 px-8 py-3 mt-4 text-white rounded-xl no-underline"
              >
                Hủy
              </Link>
              <button
                type="submit"
                className="bg-blue-400 px-8 py-3 mt-4 text-white rounded-xl"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
        <div className="w-full">
          <img src={image} alt="" className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
