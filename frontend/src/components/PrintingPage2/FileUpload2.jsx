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
    const [orderName, setOrderName] = useState('')
    const [balance, setBalance] = useState(0)
    const [activePrinter, setActivePrinter] = useState([])
    const [printerId, setPrinterId] = useState('')
    const { printNumber, sizePaper, numberPrint, optionPrint, orientation, idFile, fileName } = location.state || {}
    const data={
        "file": idFile,
        "order_name": orderName,
        "orientation": orientation,
        "sided": optionPrint,
        "page_side": sizePaper,
        "copies": Number(printNumber),
        "printer": printerId,
        "page_cost": Number(numberPrint)
    }
 
    const fetchBalance = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/users/balance/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Thêm token vào header nếu cần
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                // Xử lý lỗi từ server
                const errorData = await response.json();
                throw new Error(errorData.message || "Lỗi khi lấy số dư!");
            }

            const data = await response.json();
            setBalance(data.balance); // Giả sử API trả về { balance: 1000 }
        } catch (error) {
            // Lưu thông báo lỗi
        }
    };
    const fetchPrinter = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/printers/status_printers/", {
                method: "POST",
                body:JSON.stringify({status:"active"})
            });

            if (!response.ok) {
                // Xử lý lỗi từ server
                const errorData = await response.json();
                throw new Error(errorData.message || "Lỗi khi lấy mays in");
            }

            const data = await response.json();
       
              
              // Random một object từ mảng
             setActivePrinter(data)
        } catch (error) {
            // Lưu thông báo lỗi
        }
    };
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
            alert("đơn gửi thành công")
            navigate('/student/printing_history',{ replace: true })
        } catch (error) {
            console.error('Error:', error); // Xử lý lỗi
        }
    };

    useEffect(() => {
        fetchBalance();
        fetchPrinter()
    }, []);

   
    return (
        <div className="FileUpload2Main">
            <div className="balance2">
                <p>Số giấy:{balance} </p>
            </div>
            <div className="MainContent">
                <div className="config2Container">
                  <div className="orderName">
                    <label htmlFor="">Nhập tên cho đơn in</label><br />
                    <input type="text" value={orderName} onChange={e=>{setOrderName(e.target.value)}}/>
                  </div>
                    <div>
                        <label htmlFor="">Máy in</label>
                        <select onChange={e=>setPrinterId(e.target.value)}>
                            <option value="">Chọn</option>
                        {activePrinter.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.location}
                                </option>
                            ))}
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