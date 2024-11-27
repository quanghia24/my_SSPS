import React from 'react'
import './HomeStudent.css'
import BuyPaper from '../../../assets/buyPaper.png'
import SendFeedback from '../../../assets/sendFeedback.png'
import HistoryPrinting from '../../../assets/historyPrinting.png'
import Print from '../../../assets/print.png'
import Navbar from '../../NavFooter/NavBar'
import Footer from '../../NavFooter/Footer'
import { useNavigate } from 'react-router-dom'
const HomeStudent = () => {
  const navigate = useNavigate();
  const handleSendFeedbackClick = () => {
    navigate ('/student/send_feedback');
  }
  const handleBuyPaperClick = () => {
    navigate ('/student/buy_printing_paper');
  }
  const handlePrintingHisClick = () => {
    navigate ('/student/printing_history');
  }
  return (
  <div className="">
      
    <div className='container'>
       <div className="main-content  ">
      <div className="card ">
        <img src={Print} alt="In tài liệu" />
        
      </div>
      <div className="card ">
        <img onClick={handleSendFeedbackClick} src={SendFeedback} alt="Đóng góp ý kiến" />
       
      </div>
      <div className="card ">
        <img onClick={handleBuyPaperClick} src={BuyPaper} alt="Mua giấy" />
      
      </div>
      <div className="card ">
        <img onClick={handlePrintingHisClick} src={HistoryPrinting} alt="Lịch sử in ấn" />
     
      </div>
      </div>
    </div>
    
    </div>
  
  )
}

export default HomeStudent
