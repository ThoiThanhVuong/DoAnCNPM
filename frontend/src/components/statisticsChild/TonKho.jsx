import React,{useEffect, useState} from "react";
import '../statisticsChild/statisticChild.css';
import thongkeService from "../../services/thongkeService";
import * as XLSX from 'xlsx'
const TonKho = ()=> {
    const [text, setText] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [data, setData] = useState([]);

    const fetchTonKho = async (params={}) =>{
        const data = await thongkeService.getThongKeTonKho(params);
        setData(data);
        
    }
    useEffect(()=>{
        fetchTonKho();
    },[]);
    const handleExportExcel = () =>{
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ThongKeTonKho");
        // 3. Xuất tệp Excel
        XLSX.writeFile(workbook, "ThongKeTonKho.xlsx");
    }
    const handleReset = () =>{
        setText('');
        setTimeStart('');
        setTimeEnd('');
        setData([]);
        fetchTonKho();
    }
     const handleSearch = () =>{
        const formattedTimeStart = timeStart ? new Date(timeStart).toISOString().split('T')[0] : '';
        const formattedTimeEnd = timeEnd ? new Date(timeEnd).toISOString().split('T')[0] : '';
        console.log(formattedTimeStart);
        console.log(formattedTimeEnd);
        console.log(text);
        fetchTonKho({text, timeStart:formattedTimeStart , timeEnd : formattedTimeEnd});

    };
    
    return (
        <div className="statistics-page">
            <div className="filters-container">
                <label>Tìm kiếm sản phẩm</label>
                <input type="text" 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                />
                <label >Từ Ngày</label>
                <input type="date" 
                        value={timeStart}
                        onChange={(e)=> setTimeStart(e.target.value)}
                />
                <label >Đến Ngày</label>
                <input type="date" 
                        value={timeEnd}
                        onChange={(e) => setTimeEnd(e.target.value)}
                />
                <div className="buttons-container">
                    <button onClick={handleSearch}>Tìm kiếm</button>
                    <button onClick={handleReset}>Làm mới</button>
                    <button onClick={handleExportExcel}>Xuất Excel</button>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã SP</th>
                            <th>Tên sản phẩm</th>
                            <th>Tồn đầu kỳ</th>
                            <th>Nhập trong kỳ</th>
                            <th>Xuất trong kỳ</th>
                            <th>Tồn cuối kỳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 ? (
                                data.map((item,index)=>(
                                    <tr key={`${item.ma_sp} - ${item.ma_phien_ban_sp}`}>
                                        <td>{index+1}</td>
                                        <td>{item.ma_sp}</td>
                                        <td>{item.ten_sp}</td>
                                        <td>{item.so_luong_dau_ky}</td>
                                        <td>{item.so_luong_nhap}</td>
                                        <td>{item.so_luong_xuat}</td>
                                        <td>{item.so_luong_cuoi_ky}</td>
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan={7}>Không có dữ liệu</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TonKho;