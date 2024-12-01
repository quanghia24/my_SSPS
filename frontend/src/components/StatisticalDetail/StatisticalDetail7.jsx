import React from 'react'
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Đăng ký các phần tử Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatisticalDetail7 = () => {
  const data = [
    { id: 1, printer: "Máy in 1", orderNumber: 10, pagesA3: 1, pagesA4: 20 },
    { id: 2, printer: "Máy in 2", orderNumber: 10, pagesA3: 2, pagesA4: 20},
    { id: 3, printer: "Máy in 3", orderNumber: 10, pagesA3: 5, pagesA4: 20},
    { id: 4, printer: "Máy in 4", orderNumber: 10, pagesA3: 4, pagesA4: 20 },
    { id: 5, printer: "Máy in 5", orderNumber: 10, pagesA3: 3, pagesA4: 20 },
  ];
  const barData = {
    labels: data.map(item => item.printer),
    datasets: [
      {
        label: "Số đơn đặt hàng",
        data: data.map(item => item.orderNumber),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  const pieData = {
    labels: data.map(item => item.printer),
    datasets: [
      {
        label: "Số giấy A4",
        data: data.map(item => item.pagesA4),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // Tắt duy trì tỷ lệ khung hình
    responsive: true,
  };
  return (
    <div>
      <div className="mainContain">
        <div className="title">
          <h2>Báo cáo hệ thống tháng 5 năm 2023</h2>
        </div>
        <div className="detailContain">
          <div className="detailContainTitle">
            <h3>Bảng thống kê chi tiết</h3>
          </div>
          <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px", textAlign: "left" }}>STT</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Máy in</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Số đơn đặt hàng</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Số trang giấy A3</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Số trang giấy A4</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#e6f7ff" }}>
                  <td style={{ padding: "8px" }}>{item.id}</td>
                  <td style={{ padding: "8px" }}>{item.printer}</td>
                  <td style={{ padding: "8px" }}>{item.orderNumber}</td>
                  <td style={{ padding: "8px" }}>{item.pagesA3}</td>
                  <td style={{ padding: "8px" }}>{item.pagesA4}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="chartContain" style={{ display: "flex" }}>
          <div className="barChart" style={{ width: "600px", height: "400px" }}>
            <Bar data={barData} options={options} />
          </div>
          <div className="pieChart" style={{ width: "600px", height: "400px" }}>
            <Pie data={pieData} options={options} />
          </div>
        </div>

      </div>
    </div>
  )
}

export default StatisticalDetail7