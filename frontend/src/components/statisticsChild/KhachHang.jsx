import React,{useState} from "react";
import '../statisticsChild/statisticChild.css';
import axios from 'axios';
const KhachHang = ()=> {
    const [text, setText] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const handleFetch = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/thongke/thongKeKhachHang', {
            params: {
                text: text || undefined, // Send undefined if empty
                timeStart: timeStart || undefined,
                timeEnd: timeEnd || undefined,
              },
          });
          setData(response.data); 
          setError('');
        } catch (err) {
          setError(err.response?.data?.message || 'Error fetching data');
          console.error('Error fetching data:', err);
        }
      };
    const handleReset = () => {
        setText('');
        setTimeStart('');
        setTimeEnd('');
        setData([]);
        setError('');
      };
    return (
        <div className="statistics-page">
            <div className="filters-container">
                <label>Tìm kiếm khách hàng</label>
                <input type="text" 
                    values={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <label >Từ Ngày</label>
                <input type="date"  value={timeStart} onChange={(e) => setTimeStart(e.target.value)}/>
                <label >Đến Ngày</label>
                <input type="date" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)}/>
                <div className="buttons-container">
                    <button onClick={handleFetch}>Tìm kiếm</button>
                    <button onClick={handleReset}>Làm mới</button>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã khách hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Số lượng phiếu</th>
                            <th>Tổng số tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length >0 ? (
                                data.map((item,index)=>(
                                    <tr key={item.ma_kh}>
                                        <td>{index+1}</td>
                                        <td>{item.ma_kh}</td>
                                        <td>{item.ten_kh}</td>
                                        <td>{item.SoLuong}</td>
                                        <td>{item.total}</td>
                                        
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan={5}>Không có dữ liệu</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default KhachHang;