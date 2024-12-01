import './HomeStudent.css'
import BuyPaper from '../../../assets/buyPaper.png'
import SendFeedback from '../../../assets/sendFeedback.png'
import HistoryPrinting from '../../../assets/historyPrinting.png'
import Print from '../../../assets/print.png'
import Navbar from '../../NavFooter/NavBar'
import Footer from '../../NavFooter/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const HomeStudent = () => {
  const navigate = useNavigate()
  const handleSendFeedbackClick = () => {
    navigate('/student/send_feedback')
  }
  const handleBuyPaperClick = () => {
    navigate('/student/buy_printing_paper')
  }
  const handlePrintingHisClick = () => {
    navigate('/student/printing_history')
  }

  const getStatus = async () => {
    try {
      const access = localStorage.getItem('access')
      const res = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      localStorage.setItem('name', res.data.name)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFileUpload = () => {
    navigate('/student/file_upload')
  }

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <div className="">
      <div className="container">
        <div className="main-content  ">
          <div className="card ">
            <img onClick={handleFileUpload} src={Print} alt="In tài liệu" />
          </div>
          <div className="card ">
            <img
              onClick={handleSendFeedbackClick}
              src={SendFeedback}
              alt="Đóng góp ý kiến"
            />
          </div>
          <div className="card ">
            <img onClick={handleBuyPaperClick} src={BuyPaper} alt="Mua giấy" />
          </div>
          <div className="card ">
            <img
              onClick={handlePrintingHisClick}
              src={HistoryPrinting}
              alt="Lịch sử in ấn"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeStudent
