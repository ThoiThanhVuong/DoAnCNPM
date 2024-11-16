import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Chart/Chart.css';

const data = [
  { name: '2018', von: 0, doanhthu: 0, loinhuan: 0 },
  { name: '2019', von: 0, doanhthu: 0, loinhuan: 0 },
  { name: '2020', von: 0, doanhthu: 0, loinhuan: 0 },
  { name: '2021', von: 0, doanhthu: 0, loinhuan: 0 },
  { name: '2022', von: 0, doanhthu: 0, loinhuan: 0 },
  { name: '2023', von: 604200000, doanhthu: 683560000, loinhuan: 79360000 },
];

const Year = () => {
  const [fromYear, setFromYear] = useState('');
  const [toYear, setToYear] = useState('');

  const handleStatistics = () => {
    // Xử lý logic thống kê
  };

  const handleReset = () => {
    setFromYear('');
    setToYear('');
  };
  
  const handleExportExcel = () => {
    // Xử lý logic xuất excel
  };

  // Dữ liệu cho biểu đồ Bar Chart
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Vốn',
        data: data.map(item => item.von),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Doanh thu',
        data: data.map(item => item.doanhthu),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Lợi nhuận',
        data: data.map(item => item.loinhuan),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toLocaleString()}đ`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value.toLocaleString()}đ`;
          },
        },
      },
    },
  };

  return (
    <div className="Chart-page">
      <div className="Filter-container">
        <input
          type="text"
          placeholder="Từ năm"
          value={fromYear}
          onChange={(e) => setFromYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Đến năm"
          value={toYear}
          onChange={(e) => setToYear(e.target.value)}
        />
        <button onClick={handleStatistics}>Thống kê</button>
        <button onClick={handleReset}>Làm mới</button>
        <button onClick={handleExportExcel}>Xuất excel</button>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="table-chart-container">
        <table>
          <thead>
            <tr>
              <th>Năm</th>
              <th>Vốn</th>
              <th>Doanh thu</th>
              <th>Lợi nhuận</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.von.toLocaleString()}đ</td>
                <td>{row.doanhthu.toLocaleString()}đ</td>
                <td>{row.loinhuan.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Year;
