import React, { useEffect, useState } from "react";
import "./BuyPrintingPaper.css";
import Navbar from "../NavFooter/NavBar";
import Footer from "../NavFooter/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function BuyPrintingPaperBody() {
  const navigate = useNavigate();
  const [paperNo, setPaperNo] = useState(0);
  const [price, setPrice] = useState(-1);
  const [isSending, setIsSending] = useState(false);  // New state for tracking sending status

  const handleChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPaperNo(value);
    }
  };

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/buys/current-price/');
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchPrice();
  }, []);

  const handleSend = () => {
    setIsSending(true);  // Set isSending to true when starting the request
    const payload = {
      amount: paperNo,
    };

    const url = 'http://localhost:8000/api/buys/orders/';
    const tokens = {
      refresh: localStorage.getItem("refresh"),
      access: localStorage.getItem("access"),
    };

    axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    })
    .then((res) => {
      alert('Yêu cầu của bạn đã được gửi. Cảm ơn!');
      // navigate('/student/profile',{ replace: true });
    })
    .catch((error) => {
      console.error('Error sending:', error);
      alert('Đã xảy ra lỗi khi gửi. Vui lòng thử lại.');
    })
    .finally(() => {
      setIsSending(false);  // Set isSending to false when request is finished
    });
  };

  return (
    <div className="container-buyPrintingPaper">
      <div className="row">
        <div className="form-bg col-12 d-flex justify-content-center align-items-center">
          <form className="buyPrintingPaper__body">
            <p className="infor-title">Thông tin trang mua</p>
            <div className="buyPrintingPaper-input">
              <label for="number" className="paperNo">
                Số trang muốn mua thêm:
              </label>
              <input
                type="number"
                className="paperNo-input"
                value={paperNo}
                onChange={handleChange}
              />
            </div>
            <div className="buyPrintingPaper-detail">
              <div className="paperSum">
                <p className="title">Tổng số trang</p>
                {paperNo && <p className="number">{paperNo}</p>}
              </div>
              <div className="PriceSum">
                <p className="title">Đơn giá</p>
                <p className="number">{price}</p>
              </div>
            </div>
            <div className="buyPrintingPaper-conclude">
              <p className="title">Tổng cộng</p>
              <p className="price">{paperNo * price} VND</p>
            </div>
            {isSending ? (
              <p className="loading">Đang gửi yêu cầu...</p>  // Show loading message when sending
            ) : (
              <input
                type="submit"
                value="Thanh toán"
                className="transaction"
                onClick={handleSend}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function BuyPrintingPaper() {
  return (
    <div className="buyPrintingPaper">
      <BuyPrintingPaperBody />
    </div>
  );
}

export default BuyPrintingPaper;
