import React, { useState } from "react";
import "./BuyPrintingPaper.css";
import Navbar from "../NavFooter/NavBar";
import Footer from "../NavFooter/Footer";

function BuyPrintingPaperBody() {
  const [paperNo, setPaperNo] = useState(0);
  const paperPrice = 200;

  const handleChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setPaperNo(value);
    }
  };

  return (
    <div className="container-buyPrintingPaper">
      <div className="row">
        <div className="form-bg col-12 d-flex justify-content-center align-items-center">
          <form className="buyPrintingPaper__body ">
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
                <p className="number">{paperPrice}</p>
              </div>
            </div>
            <div className="buyPrintingPaper-conclude">
              <p className="title">Tổng cộng</p>
              <p className="price">{paperNo * paperPrice} VND</p>
            </div>
            <input type="submit" value="Thanh toán" className="transaction" />
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