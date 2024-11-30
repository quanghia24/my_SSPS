import { useState } from "react";
import './FileUpload2.css'
import printer from './Assets/printer.png'
import React from 'react'
import { useLocation } from "react-router-dom";

const FileUpload2 = () => {
    const location = useLocation();
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyNzg0NTE1LCJpYXQiOjE3MzI3ODI3MTUsImp0aSI6IjQ5N2EyOTc2M2YwYzRmNWViYTg4MWFkZDUwZmI1MGJjIiwidXNlcl9pZCI6MTMsImVtYWlsIjoibGFtMUBoY211dC5lZHUudm4iLCJwYXNzd29yZCI6InBia2RmMl9zaGEyNTYkODcwMDAwJDF6RkVZbXV6Sng0RlRNNDZZMkZOeUEkMmEyQmJKTklZRzhqa0prbktCMWROSTVlLzliM1Z4U3Rta2Zpb21PcWpJST0iLCJyb2xlIjoiY3VzdG9tZXIifQ.sVtKB1kfCtBuChy5Mdh3E8vKHMxi3ClFyJfHlwy3Y6k"
    const data={
        "file": 2,
        "order_name": "order123",
        "orientation": "portrait",
        "sided": "single",
        "page_side": "A4",
        "copies": 1,
        "printer": "12",
        "page_cost": 10
    }
    const { printNumber, sizePaper, numberPrint, optionPrint, orientation, idFile, fileName } = location.state || {}
    const handleConfirm = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/prints/orders/', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result); // Xử lý kết quả nếu cần
        } catch (error) {
            console.error('Error:', error); // Xử lý lỗi
        }
    };
    
    return (
        <div className="FileUpload2Main">
            <div className="balance2">
                <p>Số giấy: </p>
            </div>
            <div className="MainContent">
                <div className="config2Container">
                    <div>
                        <label htmlFor="">Tòa nhà</label>
                        <select id="mySelect" >
                            <option value="">-- Chọn --</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Máy in</label>
                        <select >
                            <option value="">-- Chọn --</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                </div>
                <div className="allConfig">
                    <div className="configFileName">
                        <div className="fileName">
                            <p>{fileName}</p>
                        </div>
                    </div>
                    <div className="config3Container">
                        <div className="item1">
                            <label htmlFor="">Số bản</label>
                            <input type="number" disabled value={printNumber} />
                        </div>
                        <div className="item2">
                            <label htmlFor="">Khổ giấy</label>
                            <input type="text" disabled value={sizePaper} />
                        </div>
                        <div className="item3">
                            <label htmlFor="">Tùy chọn in</label>
                            <input type="text" disabled value={optionPrint} />
                        </div>
                        <div className="item4">
                            <label htmlFor="">Khổ</label>
                            <input type="text" disabled value={orientation} />
                        </div>
                        <div className="item5">
                            <label htmlFor="">Số trang in</label>
                            <input type="text" disabled value={numberPrint} />
                        </div>
                    </div>
                </div>
                <button className="button-rs" onClick={handleConfirm }>Xác nhận</button>
            </div>
            <div className="printer">
                <img src={printer} alt="" />
            </div>
        </div>
    )
}

export default FileUpload2