import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SendFeedback.css';
import Emotion1 from '../../assets/emotion1.png';
import Emotion2 from '../../assets/emotion2.png';
import Emotion3 from '../../assets/emotion3.png';
import Emotion4 from '../../assets/emotion4.png';
import Emotion5 from '../../assets/emotion5.png';
import Navbar from '../NavFooter/NavBar';
import Footer from '../NavFooter/Footer';

const Feedback = () => {
   const [userID,setUserID] = useState('2212432');
  const [rating,setRating] = useState(5);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji((prevEmoji) => (prevEmoji === emoji ? null : emoji));
  };
  const handleSend = () => {
    const PayLoad={
      'user_id':userID,
      'rating': rating,
      'title': title,
      'content': content,
    };
    const url = 'http://localhost:8000/api/reports/';
    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PayLoad) ,
    }).then((res) =>  res.json())
    .then(res => console.log(res))
     console.log("send");
     console.log(PayLoad);
   
  };

  return (
    <div className="container-feedback">
      
      <div className="card-content " style={{paddingTop: '20vh'}}>
        <div className="card-body " >
          <h1 className="card-title p-3">Đóng góp Ý kiến</h1>
          <p className="card-text text-muted mb-6" style={{fontSize: '1.3rem'}}>
            Đóng góp của bạn là vô cùng quan trọng và cần thiết trong quá trình phát triển của chúng tôi.
          </p>
          <div className="d-flex justify-content-center mb-4">
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion1' ? 'select' : ''}`}
              onClick={() => {handleEmojiClick('emotion1');setRating(1)}}
            >
              <img src={Emotion1} alt="Sad Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion2' ? 'select' : ''}`}
              onClick={() => {handleEmojiClick('emotion2');setRating(2)}}
            >
              <img src={Emotion2} alt="Neutral Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion3' ? 'select' : ''}`}
              onClick={() => {handleEmojiClick('emotion3');setRating(3)}}
            >
              <img src={Emotion3} alt="Happy Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion4' ? 'select' : ''}`}
              onClick={() => {handleEmojiClick('emotion4');setRating(4)}}
            >
              <img src={Emotion4} alt="Excited Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center ${selectedEmoji === 'emotion5' ? 'select' : ''}`}
              onClick={() => {handleEmojiClick('emotion5');setRating(5)}}
            >
              <img src={Emotion5} alt="Love Emoji" className="me-2 emotion-icon" />
            </div>
          </div>
          {/* <textarea 
            className="form-control mb-4"
            rows={4}
            placeholder="abc..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea> */}
          <textarea
            className="form-control mb-4"
            rows={4}
            placeholder="Chia sẻ ý kiến của bạn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button className="btn btn-primary button-feedback" onClick={handleSend}>Gửi ngay</button>
        </div>
      </div>
      
    </div>
  );
};

export default Feedback;
