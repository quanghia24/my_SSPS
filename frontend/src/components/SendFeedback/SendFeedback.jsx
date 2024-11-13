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
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji((prevEmoji) => (prevEmoji === emoji ? null : emoji));
  };

  return (
    <div className="container-feedback">
      <Navbar />
      <div className="card-content">
        <div className="card-body">
          <h2 className="card-title mb-4">Đóng góp Ý kiến</h2>
          <p className="card-text text-muted mb-6">
            Đóng góp của bạn là vô cùng quan trọng và cần thiết trong quá trình phát triển của chúng tôi.
          </p>
          <div className="d-flex justify-content-center mb-4">
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion1' ? 'select' : ''}`}
              onClick={() => handleEmojiClick('emotion1')}
            >
              <img src={Emotion1} alt="Sad Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion2' ? 'select' : ''}`}
              onClick={() => handleEmojiClick('emotion2')}
            >
              <img src={Emotion2} alt="Neutral Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion3' ? 'select' : ''}`}
              onClick={() => handleEmojiClick('emotion3')}
            >
              <img src={Emotion3} alt="Happy Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center me-3 ${selectedEmoji === 'emotion4' ? 'select' : ''}`}
              onClick={() => handleEmojiClick('emotion4')}
            >
              <img src={Emotion4} alt="Excited Emoji" className="me-2 emotion-icon" />
            </div>
            <div
              className={`d-flex align-items-center ${selectedEmoji === 'emotion5' ? 'select' : ''}`}
              onClick={() => handleEmojiClick('emotion5')}
            >
              <img src={Emotion5} alt="Love Emoji" className="me-2 emotion-icon" />
            </div>
          </div>
          <textarea
            className="form-control mb-4"
            rows={4}
            placeholder="Chia sẻ ý kiến của bạn..."
          ></textarea>
          <button className="btn btn-primary button-feedback">Gửi ngay</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
