import React from 'react'
import './HomeStudent.css'
import BuyPaper from '../../../assets/buyPaper.png'
import SendFeedback from '../../../assets/sendFeedback.png'
import HistoryPrinting from '../../../assets/historyPrinting.png'
import Print from '../../../assets/print.png'
import Navbar from './NavBar'
const HomeStudent = () => {
  return (
  <div className="">
      <Navbar/>
    <div className='container'>
       <div className="main-content  ">
      <div className="card ">
        <img src={Print} alt="In tài liệu" />
        
      </div>
      <div className="card ">
        <img src={SendFeedback} alt="Đóng góp ý kiến" />
       
      </div>
      <div className="card ">
        <img src={BuyPaper} alt="Mua giấy" />
      
      </div>
      <div className="card ">
        <img src={HistoryPrinting} alt="Lịch sử in ấn" />
     
      </div>
      </div>
    </div>

    </div>
  
  )
}

export default HomeStudent
