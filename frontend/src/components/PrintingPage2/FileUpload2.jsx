import { useState,useEffect } from "react";
import './FileUpload2.css'
import printer from './Assets/printer.png'
import React from 'react'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FileUpload2 = () => {
    const navigate=useNavigate()
    const location = useLocation();
    const accessToken = localStorage.getItem('access')
    const { printNumber, sizePaper, numberPrint, optionPrint, orientation, idFile, fileName ,statusPrinter} = location.state || {}
    const data={
        "file": idFile,
        "order_name": "order123",
        "orientation": orientation,
        "sided": optionPrint,
        "page_side": sizePaper,
        "copies": Number(printNumber),
        "printer": `13`,
        "page_cost": Number(numberPrint)
    }
    console.log(printNumber)
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
            navigate('student_home')
        } catch (error) {
            console.error('Error:', error); // Xử lý lỗi
        }
    };
    // useEffect(() => {
    //     fetchBalance();
        
    // }, []);
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