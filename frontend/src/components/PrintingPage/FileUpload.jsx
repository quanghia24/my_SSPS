import React, { useState, useEffect } from "react";
import './FileUpload.css'
import uploadFile from '././Assets/delete.png';
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
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
    const accessToken = localStorage.getItem('access')
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState(null)
    const [uploadStatus, setUploadStatus] = useState("");
    const [balance, setBalance] = useState(0)

    const [printNumber, setPrintNumber] = useState(0)
    const [sizePaper, setSizePaper] = useState('')
    const [numberPrint, setNumberPrint] = useState(0)
    const [optionPrint, setOptionPrint] = useState('')
    const [orientation, setOrientation] = useState('')
    const [idFile, setIdFile] = useState('')
    
    const handleDestructor =()=>{
        window.location.reload();
    }
    
    function handleFileChange(event) {
        const file = event.target.files[0];
        setFile(file)
        setFileName(prev => file.name)
    }
    function handleRemoveFile() {
        setFileName(prev => '')
    }
    function handleNext() {
        if(numberPrint>balance){
            navigate("/student/buy_printing_paper",{ replace: true })
        }
        else{

            navigate("printing_page2", { state: { printNumber, sizePaper, numberPrint, optionPrint, orientation, idFile,fileName } })
        }



    }
    const handleCancel = () => {
        navigate("/student/student_home");
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
    

    // Gọi API khi component được render
    useEffect(() => {
        fetchBalance();
        
    }, []);



    const handleUpload = async () => {
        if (!file) {
            setUploadStatus("Vui lòng chọn file trước khi upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // 'file' là tên trường mà API yêu cầu

        try {
            const response = await fetch("http://127.0.0.1:8000/api/prints/files/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Thêm token vào header
                },
                body: formData, // Dữ liệu file
            });

            if (response.ok) {
                const data = await response.json();
                setIdFile(data.id)
                setUploadStatus(`Upload thành công`);
            } else {
                const errorData = await response.json();
                setUploadStatus(`Upload thất bại|| "Lỗi không xác định."}`);
            }
        } catch (error) {
            setUploadStatus(`Lỗi: ${error.message}`);
        }
    };


    return (
        <div className='Container'>
            <div className='MainContain'>
                <div className="balance">
                    <p>Số giấy: {balance}</p>
                </div>
                {/* <div className="destructor">
                    <button className="button-rs" onClick={handleDestructor}>Hủy</button>
                </div> */}
                <p>{uploadStatus}</p>
                <div className='UploadContain'>
                    <div className='fileUpload'>
                        <div className='fileUpload-text'>
                            <p>Tải tài liệu</p>
                        </div>
                        <div className='fileUpload-Content'>

                            <div className="fileUploadFrame">
                                <div className='fileUpload-labelContain'>
                                    <label htmlFor="fileupload">
                                        <svg
                                            className="svg-icon fileuploadImage"
                                            style={{ width: '48px', height: '52px', verticalAlign: 'middle', fill: '#3276E8', overflow: 'hidden' }}
                                            viewBox="0 0 1024 1024"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M744.8 709.2l23.1-23.1V928c0 17.7 14.3 32 32 32s32-14.3 32-32V686.1l23.1 23.1c12.5 12.5 32.8 12.5 45.3 0 6.3-6.3 9.4-14.4 9.4-22.6s-3.1-16.4-9.4-22.6l-77.7-77.7c-0.4-0.4-0.8-0.7-1.2-1.1-0.2-0.1-0.3-0.3-0.5-0.4-0.2-0.2-0.4-0.4-0.7-0.6-0.2-0.2-0.5-0.4-0.7-0.6-0.2-0.1-0.3-0.3-0.5-0.4-0.3-0.2-0.5-0.4-0.8-0.6-0.2-0.1-0.3-0.2-0.5-0.3-0.3-0.2-0.6-0.4-0.9-0.5-0.2-0.1-0.3-0.2-0.5-0.3-0.3-0.2-0.6-0.3-0.9-0.5-0.2-0.1-0.3-0.2-0.5-0.3-0.3-0.1-0.5-0.3-0.8-0.4l-0.6-0.3c-0.2-0.1-0.5-0.2-0.8-0.3-0.2-0.1-0.5-0.2-0.7-0.3-0.2-0.1-0.4-0.2-0.7-0.3-0.3-0.1-0.5-0.2-0.8-0.3-0.2-0.1-0.4-0.1-0.6-0.2l-0.9-0.3c-0.2-0.1-0.3-0.1-0.5-0.1-0.3-0.1-0.7-0.2-1-0.3-0.2 0-0.3-0.1-0.5-0.1-0.3-0.1-0.7-0.2-1-0.2-0.2 0-0.3-0.1-0.5-0.1-0.3-0.1-0.7-0.1-1-0.2-0.2 0-0.4 0-0.6-0.1-0.3 0-0.6-0.1-1-0.1-0.3 0-0.5 0-0.8-0.1-0.3 0-0.5 0-0.8-0.1H798.1c-0.3 0-0.5 0-0.8 0.1-0.3 0-0.5 0-0.8 0.1-0.3 0-0.7 0.1-1 0.1-0.2 0-0.4 0-0.6 0.1-0.3 0.1-0.7 0.1-1 0.2-0.2 0-0.3 0.1-0.5 0.1-0.3 0.1-0.7 0.1-1 0.2-0.2 0-0.3 0.1-0.5 0.1-0.3 0.1-0.7 0.2-1 0.3-0.2 0-0.3 0.1-0.5 0.1l-0.9 0.3c-0.2 0.1-0.4 0.1-0.6 0.2-0.3 0.1-0.5 0.2-0.8 0.3-0.2 0.1-0.4 0.2-0.7 0.3-0.2 0.1-0.5 0.2-0.7 0.3-0.3 0.1-0.5 0.2-0.8 0.3l-0.6 0.3c-0.3 0.1-0.5 0.3-0.8 0.4-0.2 0.1-0.3 0.2-0.5 0.3-0.3 0.2-0.6 0.3-0.9 0.5-0.2 0.1-0.3 0.2-0.5 0.3-0.3 0.2-0.6 0.4-0.9 0.5-0.2 0.1-0.3 0.2-0.5 0.3-0.3 0.2-0.5 0.4-0.8 0.6-0.2 0.1-0.3 0.3-0.5 0.4-0.2 0.2-0.5 0.4-0.7 0.6-0.2 0.2-0.4 0.4-0.7 0.6-0.2 0.1-0.3 0.3-0.5 0.4-0.4 0.4-0.8 0.7-1.2 1.1L699.1 664c-12.5 12.5-12.5 32.8 0 45.3 12.9 12.4 33.2 12.4 45.7-0.1zM641.2 256.1c0-17.7-14.3-32-32-32H225.7c-17.7 0-32 14.3-32 32s14.3 32 32 32h383.6c17.6 0 31.9-14.3 31.9-32zM641.2 448.2c0-17.7-14.3-32-32-32H225.7c-17.7 0-32 14.3-32 32s14.3 32 32 32h383.6c17.6 0 31.9-14.3 31.9-32zM225.7 608.3c-17.7 0-32 14.3-32 32s14.3 32 32 32h191.8c17.7 0 32-14.3 32-32s-14.3-32-32-32H225.7z" />
                                            <path d="M544.6 832.4H159.8c-17.6 0-31.9-14.3-31.9-32V160.1c0-17.7 14.3-32 31.9-32h513.9c17.6 0 31.9 14.3 31.9 32v320.2c0 17.7 14.3 32 31.9 32 17.6 0 31.9-14.3 31.9-32V160.1c0-55.2-44.8-100.1-100.1-100.1H159.8c-55.3 0-100.1 44.8-100.1 100.1v640.3c0 55.2 44.8 100.1 100.1 100.1h384.8c55.3 0 100.1-44.8 100.1-100.1v-160.2c0-17.7-14.3-32-31.9-32s-31.9 14.3-31.9 32v128.2c0 17.7-14.3 32-31.9 32z" />
                                        </svg>

                                    </label>
                                </div>
                                <div className='upload-text'>
                                    <p>Chọn tập tin</p>
                                </div>
                            </div>
                        </div>
                        <input type="file" accept=".pdf ,.doc ,.docx" id="fileupload" onChange={handleFileChange} />
                    </div>
                    <div className='uploadStatus'>
                        <div className="statusContainer">
                            <div className="statusText">
                                <p>{fileName}</p>
                                {/* {fileName && <p className="statusTextSuccess">Tải lên thành công</p>} */}
                            </div>
                            {fileName && <div className="statusIcon" onClick={handleRemoveFile}>
                                <img src={uploadFile} alt="trash" />
                            </div>}
                        </div>
                        {fileName && <button className="button-rs" onClick={handleUpload}>Xác nhận</button>}
                    </div>
                </div>
                <div className="configContainer">
                    <div className="config1Container">
                        <div className="select1">
                            <label htmlFor="mySelect">Số bản</label>
                            <select id="mySelect" onChange={(e) => setPrintNumber(e.target.value)} >
                                <option value="">-- Chọn --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>

                        </div>
                        <div className="select2">
                            <label htmlFor="mySelect2">Khổ giấy</label>
                            <select id="mySelect2" onChange={(e) => setSizePaper(e.target.value)}>
                                <option value="">-- Chọn --</option>
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="A5">A5</option>
                            </select>
                        </div>
                        <div className="select3">
                            <label htmlFor="mySelect3">Số trang in</label>
                            <input type="number" id="mySelect3" placeholder="VD:1-10" onChange={(e) => setNumberPrint(e.target.value)} />

                        </div>
                        <div className="select4">
                            <label htmlFor="mySelect4">Tùy chọn in</label>
                            <select id="mySelect4" onChange={(e) => setOptionPrint(e.target.value)}>
                                <option value="">-- Chọn --</option>
                                <option value="double">In 2 mặt</option>
                                <option value="single">In 1 mặt</option>
                            </select>
                        </div>
                        <div className="select5">
                            <label htmlFor="mySelect5">Khổ</label>
                            <select id="mySelect5" onChange={(e) => setOrientation(e.target.value)} >
                                <option value="">-- Chọn --</option>
                                <option value="portrait">Chiều dọc</option>
                                <option value="landscape">Chiều ngang</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleNext}>Tiếp theo</button>
                </div>
                <button onClick={handleCancel} className="button-rs">Hủy bỏ</button>
            </div>
        </div>
    )
}

export default FileUpload