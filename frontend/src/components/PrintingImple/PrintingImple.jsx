import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'

function PrintingImple() {
  const [balance, setBalance] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const getBalance = async () => {
    try {
      const access = localStorage.getItem('access')
      const res = await axios.get(
        'http://127.0.0.1:8000/api/users/reset-all-balance/',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      setBalance(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  const setPage = async (data) => {
    try {
      const access = localStorage.getItem('access')
      await axios.post(
        'http://127.0.0.1:8000/api/users/paper/',
        {
          amount: data.amount,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      toast.success('Set page success')
      reset({
        amount: '',
      })
    } catch (err) {
      toast.error('Set page fail!!!')
      console.log(err)
    }
  }

  const setPrice = async (data) => {
    try {
      const access = localStorage.getItem('access')

      await axios.post(
        'http://127.0.0.1:8000/api/buys/prices/',
        {
          price: data.price,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      toast.success('Set price success')
      reset({
        price: '',
      })
    } catch (err) {
      toast.error('Set price fail!!!')
      console.log(err)
    }
  }

  const setDate = async (data) => {
    try {
      const access = localStorage.getItem('access')

      await axios.post(
        'http://127.0.0.1:8000/api/users/reset-date/',
        {
          resetDate: data.resetDate,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      )
      toast.success('Set date success')
      reset({
        resetDate: '',
      })
    } catch (err) {
      toast.error('Set date fail!!!')
      console.log(err)
    }
  }

  return (
    <div>
      <div className="h-screen flex">
        <div className="w-full">
          <div>
            <div className="text-4xl w-80 font-semibold shadow-xl rounded-br-lg p-3 border border-black">
              Thiết lập máy in
            </div>
          </div>
          <div className="w-full px-[25px] py-20">
            <div className="w-full h-full items-center grid grid-cols-3 gap-10">
              <form
                onSubmit={handleSubmit(setPage)}
                class="max-w-sm mx-auto w-full"
              >
                <div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Input paper
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="123"
                      {...register('amount')}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Set Paper
                  </button>
                </div>
              </form>
              <form
                onSubmit={handleSubmit(setPrice)}
                class="max-w-sm mx-auto w-full"
              >
                <div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Input Price
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="123"
                      required
                      {...register('price')}
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Set Price
                  </button>
                </div>
              </form>
              <form
                onSubmit={handleSubmit(setDate)}
                class="max-w-sm mx-auto w-full"
              >
                <div>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Input Date
                    </label>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="123"
                      required
                      {...register('resetDate')}
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Set Date
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintingImple
