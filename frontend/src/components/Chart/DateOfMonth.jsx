import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Chart/Chart.css';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;


const getDaysInMonth = (year, month) => {
    if (month === 2) { 
      
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28;
    }
    // Months with 31 days
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
    // Months with 30 days
    return 30;
  };
  
  // Function to create random data for each day in a given month and year
  const generateRandomDataForMonth = (year, month) => {
    const days = getDaysInMonth(year, month);
    return Array.from({ length: days }, () => {
      const cost = getRandomInt(1000000, 50000000); // Random cost between 1M and 50M
      const revenue = getRandomInt(cost, cost + 20000000); // Random revenue at least equal to cost, up to 20M more
      const profit = revenue - cost; // Profit as the difference between revenue and cost
      return { cost, revenue, profit };
    });
  };
const data ={
    2021:{'Tháng 1': generateRandomDataForMonth(2021,1),
        'Tháng 2': generateRandomDataForMonth(2021,2),
        'Tháng 3': generateRandomDataForMonth(2021,3),
        'Tháng 4': generateRandomDataForMonth(2021,4),
        'Tháng 5': generateRandomDataForMonth(2021,5),
        'Tháng 6': generateRandomDataForMonth(2021,6),
        'Tháng 7': generateRandomDataForMonth(2021,7),
        'Tháng 8': generateRandomDataForMonth(2021,8),
        'Tháng 9': generateRandomDataForMonth(2021,9),
        'Tháng 10': generateRandomDataForMonth(2021,10),
        'Tháng 11': generateRandomDataForMonth(2021,11),
        'Tháng 12': generateRandomDataForMonth(2021,12),
    },
    2022:{'Tháng 1': generateRandomDataForMonth(2022,1),
        'Tháng 2': generateRandomDataForMonth(2022,2),
        'Tháng 3': generateRandomDataForMonth(2022,3),
        'Tháng 4': generateRandomDataForMonth(2022,4),
        'Tháng 5': generateRandomDataForMonth(2022,5),
        'Tháng 6': generateRandomDataForMonth(2022,6),
        'Tháng 7': generateRandomDataForMonth(2022,7),
        'Tháng 8': generateRandomDataForMonth(2022,8),
        'Tháng 9': generateRandomDataForMonth(2022,9),
        'Tháng 10': generateRandomDataForMonth(2022,10),
        'Tháng 11': generateRandomDataForMonth(2022,11),
        'Tháng 12': generateRandomDataForMonth(2022,12),
    },
    2023:{'Tháng 1': generateRandomDataForMonth(2023,1),
        'Tháng 2': generateRandomDataForMonth(2023,2),
        'Tháng 3': generateRandomDataForMonth(2023,3),
        'Tháng 4': generateRandomDataForMonth(2023,4),
        'Tháng 5': generateRandomDataForMonth(2023,5),
        'Tháng 6': generateRandomDataForMonth(2023,6),
        'Tháng 7': generateRandomDataForMonth(2023,7),
        'Tháng 8': generateRandomDataForMonth(2023,8),
        'Tháng 9': generateRandomDataForMonth(2023,9),
        'Tháng 10': generateRandomDataForMonth(2023,10),
        'Tháng 11': generateRandomDataForMonth(2023,11),
        'Tháng 12': generateRandomDataForMonth(2023,12),
    } 
}
const sumDataInGroups = (data) => {
  const result = [];
  const groupSize=3;
  for (let i = 0; i < data.length; i += groupSize) {
    const group = data.slice(i, i + groupSize);
    const summedGroup = group.reduce(
      (acc, day) => ({
        cost: acc.cost + day.cost,
        revenue: acc.revenue + day.revenue,
        profit: acc.profit + day.profit,
      }),
      { cost: 0, revenue: 0, profit: 0 }
    );
    result.push(summedGroup);
  }
  if(data.length % groupSize !==0 ){
    const lastGroup =result.pop();
    const secondLastGroup =result.pop();
      result.push({
        cost: secondLastGroup.cost + lastGroup.cost,
        revenue: secondLastGroup.revenue + lastGroup.revenue,
        profit: secondLastGroup.profit + lastGroup.profit,
      })
  }
  return result;
};
const DateOfMonth = () =>{
    const [selectedMonth, setSelectedMonth] = useState('Tháng 1');
    const [selectedYear, setSelectedYear] = useState(2023);
    const handleChangeyear=(e)=>{
        setSelectedYear(parseInt(e.target.value))
    }
    const handleChangeMonth =(e) => setSelectedMonth(e.target.value);
    const handleExportExcel = (e)=>{
      
    }
    const groupedData = sumDataInGroups(data[selectedYear][selectedMonth]);
    const chartData ={
        labels : groupedData.map((_, index) =>{
          const startDay = index * 3 + 1;
          let endDay = (index + 1) * 3;

        // Nếu đây là nhóm cuối cùng và số ngày cuối không chia hết cho 3
        if (index === groupedData.length - 1 && data[selectedYear][selectedMonth].length % 3 !== 0) {
            endDay = data[selectedYear][selectedMonth].length;
        }
          return `Ngày ${startDay}-${endDay}`;
        }),
        datasets :[
            {
                label:'Vốn',
                data:groupedData.map((group) => group.cost),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label : 'Doanh thu',
                data:groupedData.map((group) => group.revenue),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
              },
              {
                label: 'Lợi nhuận',
                data:groupedData.map((group) => group.profit),
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
              },
        ] 
        
    };
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
            text: `Thống kê vốn, doanh thu, và lợi nhuận tháng ${selectedMonth} năm ${selectedYear}`
          }
        }
    };

      return(
<div className="Chart-page">
          <div className="Filter-container">
            <label >Chọn tháng</label>
            <select value={selectedMonth} onChange={handleChangeMonth}>
              {
                Object.keys(data[selectedYear]).map((month)=>(
                  <option key={month} value={month}>
                    {month}
                  </option>
                )
               )
              }
            </select>
            <label>Chọn năm:</label>
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
        

    <div className="table-chart-container">
      <table>
        <thead>
          <tr>
            <th>Ng</th>
            <th>Chi Phí</th>
            <th>Doanh thu</th>
            <th>Lợi nhuận</th>
          </tr>
        </thead>
        <tbody>
          {data[selectedYear][selectedMonth].map((row, index) => (
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
export default DateOfMonth;