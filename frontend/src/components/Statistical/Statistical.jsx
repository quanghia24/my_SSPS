import React from 'react'
import './Statistical.css'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Đăng ký các module của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistical = () => {
    const data = {
        labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Tần suất",
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], // Cập nhật dữ liệu cho 12 tháng
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(255, 99, 132, 0.5)", // Thêm màu cho tháng 7
                    "rgba(54, 162, 235, 0.5)", // Thêm màu cho tháng 8
                    "rgba(255, 206, 86, 0.5)", // Thêm màu cho tháng 9
                    "rgba(75, 192, 192, 0.5)", // Thêm màu cho tháng 10
                    "rgba(153, 102, 255, 0.5)", // Thêm màu cho tháng 11
                    "rgba(255, 159, 64, 0.5)", // Thêm màu cho tháng 12
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)", // Thêm màu cho tháng 7
                    "rgba(54, 162, 235, 1)", // Thêm màu cho tháng 8
                    "rgba(255, 206, 86, 1)", // Thêm màu cho tháng 9
                    "rgba(75, 192, 192, 1)", // Thêm màu cho tháng 10
                    "rgba(153, 102, 255, 1)", // Thêm màu cho tháng 11
                    "rgba(255, 159, 64, 1)", // Thêm màu cho tháng 12
                ],
                borderWidth: 3,

            },
        ],
    };

    // Tùy chọn cấu hình
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: "false",
                position: "top",
            },
            title: {
                display: true,
                text: "Tần suất sử dụng của các máy in",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    const data2 = {
        labels: [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Tần suất",
                data: [30, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], // Cập nhật dữ liệu cho 12 tháng
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(255, 99, 132, 0.5)", // Thêm màu cho tháng 7
                    "rgba(54, 162, 235, 0.5)", // Thêm màu cho tháng 8
                    "rgba(255, 206, 86, 0.5)", // Thêm màu cho tháng 9
                    "rgba(75, 192, 192, 0.5)", // Thêm màu cho tháng 10
                    "rgba(153, 102, 255, 0.5)", // Thêm màu cho tháng 11
                    "rgba(255, 159, 64, 0.5)", // Thêm màu cho tháng 12
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)", // Thêm màu cho tháng 7
                    "rgba(54, 162, 235, 1)", // Thêm màu cho tháng 8
                    "rgba(255, 206, 86, 1)", // Thêm màu cho tháng 9
                    "rgba(75, 192, 192, 1)", // Thêm màu cho tháng 10
                    "rgba(153, 102, 255, 1)", // Thêm màu cho tháng 11
                    "rgba(255, 159, 64, 1)", // Thêm màu cho tháng 12
                ],
                borderWidth: 3,
            },
        ],
    };

    // Tùy chọn cấu hình
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                display: "false",
                position: "top",
            },
            title: {
                display: true,
                text: "Lượng giấy đã sử dụng",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    return (
        <div className='statisticalContainer'>
            <div className="statisticalText">
                <h2>Thống kê</h2>
            </div>
            <div className='bar1Container' >
                <select name="" id="bar1Select">
                    <option value="">Year</option>
                    <option value="">Weekly</option>
                </select>
                <Bar data={data} options={options} />
            </div>
            <div className="bar2Container">
            <select name="" id="bar2Select">
                    <option value="">Year</option>
                    <option value="">Recent Month</option>
                </select>
                <Bar className='bar2' data={data2} options={options2} />
            </div>
        </div>

    )
}

export default Statistical