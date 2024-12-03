import React from 'react'
import './ConfigPrinter.css'
import printer from './Assets/printer.png'
const ConfigPrinter = () => {
    return (
        <div className='configPrinterMainContain'>

            <div className="configPrinterContent">

                <div className="configPrinterContentLeft">
                    <div className="configPrinterText">
                        <h2>Cấu hình máy in</h2>
                    </div>
                    <div className="configItem1">
                        <label htmlFor="">Tòa nhà</label>
                        <select id="mySelect" >
                            <option value="">-- Chọn --</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="configItem2">
                        <label htmlFor="">Máy in</label>
                        <select id="mySelect" >
                            <option value="">-- Chọn --</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="configItem3">
                        <label htmlFor="">Loại file được phép in</label>
                        <select id="mySelect" >
                            <option value="">PDF</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <div className="configItem4">
                        <label htmlFor="">Giới hạn số trang in</label>
                        <input type="text" />
                    </div>
                    <div className="configItem5">
                        <label htmlFor="">Ngày cấp phép số trang in</label>
                        <input type="date" />
                    </div>
                </div>
                <div className="configPrinterContentRight">
                    <div className="imgPrinter">
                        <img src={printer} alt="" />
                    </div>
                  
                        <button className='namePrinter'>Máy in 101H5</button>
                    
                </div>
            </div>
        </div>
    )
}

export default ConfigPrinter