import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Chart/Chart.css';
const data = {
  2021: [
    { month: 'Tháng 1', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 2', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 3', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 4', cost: 200000000, revenue: 250000000, profit: 50000000 },
    { month: 'Tháng 5', cost: 180000000, revenue: 230000000, profit: 50000000 },
    { month: 'Tháng 6', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 7', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 8', cost: 100000000, revenue: 120000000, profit: 20000000 },
    { month: 'Tháng 9', cost: 150000000, revenue: 200000000, profit: 50000000 },
    { month: 'Tháng 10', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 11', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 12', cost: 0, revenue: 0, profit: 0 },
  ],
  2022: [
    { month: 'Tháng 1', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 2', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 3', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 4', cost: 250000000, revenue: 300000000, profit: 50000000 },
    { month: 'Tháng 5', cost: 220000000, revenue: 270000000, profit: 50000000 },
    { month: 'Tháng 6', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 7', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 8', cost: 100000000, revenue: 120000000, profit: 20000000 },
    { month: 'Tháng 9', cost: 180000000, revenue: 250000000, profit: 70000000 },
    { month: 'Tháng 10', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 11', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 12', cost: 0, revenue: 0, profit: 0 },
  ],
  2023: [
    { month: 'Tháng 1', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 2', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 3', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 4', cost: 346000000, revenue: 384500000, profit: 38500000 },
    { month: 'Tháng 5', cost: 258200000, revenue: 299060000, profit: 40860000 },
    { month: 'Tháng 6', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 7', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 8', cost: 100000000, revenue: 150000000, profit: 50000000 },
    { month: 'Tháng 9', cost: 200000000, revenue: 280000000, profit: 80000000 },
    { month: 'Tháng 10', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 11', cost: 0, revenue: 0, profit: 0 },
    { month: 'Tháng 12', cost: 0, revenue: 0, profit: 0 },
  ]
};

const ChartMonth =()=>{
    const [selectedYear ,setSelectedYear] =useState(2023);
    const handleExportExcel = () => {
        // Xử lý logic xuất excel
      };
      const handleChangeyear =(e) =>{
        setSelectedYear(parseInt(e.target.value));
      }
    const chartData = {
      labels : data[selectedYear].map(item => item.month),
      datasets : [
        {
          label :'Vốn',
          data: data[selectedYear].map(item =>item.cost),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label : 'Doanh thu',
          data:data[selectedYear].map(item => item.revenue),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Lợi nhuận',
          data: data[selectedYear].map(item => item.profit),
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],

    } ;
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${value.toLocaleString()}đ`;
              },
            },
          },
          x: {
            stacked: false,
            grid: {
              display: false,
            },
            barThickness: 12,
          },
        },
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: `Thống kê vốn, doanh thu, và lợi nhuận năm ${selectedYear}`
          }
        }
      };
  return (
    <div className="statistics-page">
          <div className="filter-container">
            <label>Chọn năm thống kê:</label>
            <select value={selectedYear} onChange={handleChangeyear}>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
            </select>
            <button onClick={handleExportExcel}>Xuất excel</button>
          </div>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Tháng</th>
            <th>Vốn</th>
            <th>Doanh thu</th>
            <th>Lợi nhuận</th>
          </tr>
        </thead>
        <tbody>
          {data[selectedYear].map((row, index) => (
            <tr key={index}>
              <td>{row.month}</td>
              <td>{row.cost.toLocaleString()}đ</td>
              <td>{row.revenue.toLocaleString()}đ</td>
              <td>{row.profit.toLocaleString()}đ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ChartMonth;