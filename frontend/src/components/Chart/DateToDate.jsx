import React,{useEffect, useState} from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import thongkeService from "../../services/thongkeService";
const DateToDate = ()=>{
 const [data,setData]= useState([]);
 const [toDate,setToDate] = useState("");
 const [fromDate,setFromDate] = useState('');
 const fetchData= async (params={}) =>{
    const data= await thongkeService.getThongKeNgayDenNgay(params);
    setData(data);
 }
 useEffect(()=>{
    fetchData();
 },[]);
 // Hàm format giá tiền
 const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };
const handleStatistic =()=>{
    fetchData({start: new Date(fromDate),end: new Date(toDate)})
};
const handleExportExcel = () =>{
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ThongKeDoanhThu_TuNgayDenNgay");
    // 3. Xuất tệp Excel
    XLSX.writeFile(workbook, "ThongKeDoanhThu_TuNgayDenNgay.xlsx");
}
// Chuẩn bị dữ liệu cho biểu đồ
const labels = data.map((item) => item.ngay);
const chartData = {
    labels,
    datasets: [
        {
            label: 'Vốn',
            data: data.map((item) => item.chiphi),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
        },
        {
            label: 'Doanh thu',
            data: data.map((item) => item.doanhthu),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4,
        },
        {
            label: 'Lợi nhuận',
            data: data.map((item) => item.loi_nhuan),
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: true,
            tension: 0.4,
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Giá trị (VNĐ)',
            },
        },
        x: {
            title: {
                display: true,
                text: 'Ngày',
            },
        },
    },
    plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: `Thống kê doanh thu 8 ngày gần nhất`,
        }
      }
};
 return(
    <div className="Chart-page">
      <div className="Filter-container">
        <input
          type="date"
          placeholder="Từ ngày"
            value={fromDate}
            onChange={(e)=> setFromDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Đến ngày"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          
        />
        <button onClick={handleStatistic}>Thống kê</button>
        <button >Làm mới</button>
        <button onClick={handleExportExcel}>Xuất excel</button>
      </div>

      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>

      <div className="table-chart-container">
        <table>
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Vốn</th>
              <th>Doanh thu</th>
              <th>Lợi nhuận</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.ngay}</td>
                <td>{formatCurrency(item.chiphi)}</td>
                <td>{formatCurrency(item.doanhthu)}</td>
                <td>{formatCurrency(item.loi_nhuan)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 );
}
export default DateToDate;