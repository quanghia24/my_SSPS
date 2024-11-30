import React from 'react'
import './Statistical.css'
import { Link } from 'react-router-dom';
const Statistical = () => {
   
        const data = [
          { id: 1, month: "Tháng 1", year: 2024, details: "Báo cáo hệ thống SSPS tháng 1- Năm 2024" },
          { id: 2, month: "Tháng 2", year: 2024, details: "Báo cáo hệ thống SSPS tháng 2- Năm 2024" },
          { id: 3, month: "Tháng 3", year: 2024, details: "Báo cáo hệ thống SSPS tháng 3- Năm 2024" },
          { id: 4, month: "Tháng 4", year: 2024, details: "Báo cáo hệ thống SSPS tháng 4- Năm 2024" },
          { id: 5, month: "Tháng 5", year: 2024, details: "Báo cáo hệ thống SSPS tháng 5- Năm 2024" },
          { id: 5, month: "Tháng 6", year: 2024, details: "Báo cáo hệ thống SSPS tháng 6- Năm 2024" },
          { id: 5, month: "Tháng 7", year: 2024, details: "Báo cáo hệ thống SSPS tháng 7- Năm 2024" },
          { id: 5, month: "Tháng 8", year: 2024, details: "Báo cáo hệ thống SSPS tháng 8- Năm 2024" },
          { id: 5, month: "Tháng 9", year: 2024, details: "Báo cáo hệ thống SSPS tháng 9- Năm 2024" },
          { id: 5, month: "Tháng 10", year: 2024, details: "Báo cáo hệ thống SSPS tháng 10- Năm 2024" },
          { id: 5, month: "Tháng 11", year: 2024, details: "Báo cáo hệ thống SSPS tháng 11- Năm 2024" },
          { id: 5, month: "Tháng 12", year: 2024, details: "Báo cáo hệ thống SSPS tháng 12- Năm 2024" },
        ];

  const getRowStyle = (rowIndex) => ({
    backgroundColor: rowIndex % 2 === 0 ? "#f0f0f0" : "#dff0d8",
  });
        
  return (
    <div>
        <div className="mainContain">
            <div className="title">
                <h2>Báo Cáo Hệ Thống</h2>
            </div>
            <div className="filterContain">
                <div className="filterInput1">
                    <label htmlFor="" >Chọn loại báo cáo</label>
                    <select name="" id="">
                        <option value="Theo Tháng">Theo Tháng</option>
                    </select>
                </div>
                <div className="filterInput2">
                    <label htmlFor="" >Chọn năm</label>
                    <select name="" id="">
                        <option value="Tất cả">Tất cả</option>
                    </select>
                </div>
                <div className="filterInput3">
                    <label htmlFor="" >Chọn tháng</label>
                    <select name="" id="">
                        <option value="Theo Tháng">Tất cả</option>
                    </select>
                </div>
            </div>
            <div className="tableContain">
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px", textAlign: "left" }}>STT</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Tháng</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Năm</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => (
            <tr key={item.id} style={getRowStyle(index)}>
              <td style={{ padding: "8px" }}>{item.id}</td>
              <td style={{ padding: "8px" }}>{item.month}</td>
              <td style={{ padding: "8px" }}>{item.year}</td>
              <td style={{ padding: "8px" }}>
                <Link to={`report${index+1}`}>{item.details}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
        </div>
    </div>
  )
}

export default Statistical