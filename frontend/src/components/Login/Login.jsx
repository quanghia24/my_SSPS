import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/image.png'
import image from '../../assets/image (1).png'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { jwtDecode } from 'jwt-decode'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const login = async (data) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/login/',
        {
          email: data.email,
          password: data.password,
        },
      )
      const user = response.data
      if (user && user.access) {
        localStorage.setItem('access', user.access)
        localStorage.setItem('refresh', user.refresh)
        const decoded = jwtDecode(user.access)
        console.log(decoded)
        localStorage.setItem('user_id', decoded.user_id)
        localStorage.setItem('role', decoded.role)
        const role = decoded.role
        // eslint-disable-next-line default-case
        switch (role) {
          case 'customer':
            navigate('/student/student_home')
            break
          case 'admin':
            navigate('/admin_home')
            break
        }
      }
      toast.success('Login success')
    } catch (err) {
      toast.error('Invalid username or password!!!')
      console.log(err)
    }
  }

  return (
    <div>
      <div className="bg-blue-100 p-20 flex gap-20">
        <div className="w-full pt-40 pl-20">
          <form
            onSubmit={handleSubmit(login)}
            className="border border-black rounded-lg flex flex-col justify-center items-center py-4 px-24"
          >
            <div className="">
              <img src={logo} alt="" className="w-[100px] h-[100px]" />
            </div>
            <div className="text-3xl mt-2 font-bold">ĐĂNG NHẬP</div>
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
              <div className="relative w-full mt-8 bg-gray-200 rounded-lg">
                <div className="rounded-xl px-3 flex justify-between items-center gap-4">
                  <div className="flex gap-4">
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-[30px]"
                    >
                      <path
                        d="M12.3749 21.3749V22.4998C12.3749 22.7982 12.2564 23.0844 12.0454 23.2953C11.8344 23.5063 11.5483 23.6248 11.2499 23.6248H8.99994V24.7498C8.99994 25.3466 8.76289 25.9189 8.34093 26.3408C7.91898 26.7628 7.34669 26.9998 6.74995 26.9998H2.24998C1.65325 26.9998 1.08096 26.7628 0.659005 26.3408C0.237051 25.9189 0 25.3466 0 24.7498V21.8406C0.000127433 21.2439 0.237262 20.6717 0.659245 20.2499L9.36669 11.5424C8.83278 9.72947 8.88315 7.79444 9.51066 6.01172C10.1382 4.229 11.311 2.68906 12.8628 1.61026C14.4146 0.531463 16.2666 -0.0314448 18.1562 0.00135624C20.0459 0.0341573 21.8773 0.661002 23.3907 1.79301C24.9041 2.92501 26.0227 4.50472 26.588 6.30815C27.1533 8.11158 27.1364 10.0472 26.5399 11.8405C25.9434 13.6339 24.7975 15.1939 23.2647 16.2994C21.7318 17.405 19.8898 17.9999 17.9999 17.9999H15.7476V20.2499C15.7476 20.5482 15.6291 20.8344 15.4181 21.0454C15.2072 21.2563 14.921 21.3749 14.6226 21.3749H12.3727H12.3749ZM20.2499 8.99994C20.8466 8.99994 21.4189 8.76289 21.8408 8.34093C22.2628 7.91898 22.4998 7.34669 22.4998 6.74995C22.4998 6.15322 22.2628 5.58093 21.8408 5.15898C21.4189 4.73702 20.8466 4.49997 20.2499 4.49997C19.6531 4.49997 19.0808 4.73702 18.6589 5.15898C18.2369 5.58093 17.9999 6.15322 17.9999 6.74995C17.9999 7.34669 18.2369 7.91898 18.6589 8.34093C19.0808 8.76289 19.6531 8.99994 20.2499 8.99994Z"
                        fill="black"
                      />
                    </svg>

                    <div className="flex flex-col py-3 w-full">
                      <div className="text-lg">Password</div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="**************"
                        className="border-none outline-none w-full text-black font-bold placeholder:text-black placeholder:opacity-60 bg-gray-200"
                        {...register('password', {
                          required: 'Password is required',
                        })}
                      />
                      {errors.password && (
                        <p className="text-red-500 absolute top-20 text-lg">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className="cursor-pointer mt-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-7"
                      >
                        <path d="M12 4.5C5.25 4.5 1.5 12 1.5 12s3.75 7.5 10.5 7.5S22.5 12 22.5 12 18.75 4.5 12 4.5Zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-7"
                      >
                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <Link
                to="/register"
                className="text-blue-800 no-underline text-start w-full mt-3"
              >
                Đăng kí
              </Link>
              <Link
                to="http://127.0.0.1:8000/password-reset/"
                className="text-blue-800 no-underline text-end w-full mt-3"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-blue-400 px-8 py-3 mt-4 text-white rounded-xl"
            >
              Đăng nhập
            </button>
          </form>
        </div>
        <div className="w-full">
          <img src={image} alt="" className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default Login
