import React,{useState} from "react";
import '../statisticsChild/statisticChild.css';
const TonKho = ()=> {

    return (
        <div className="statistics-page">
            <div className="filters-container">
                <label>Tìm kiếm khách hàng</label>
                <input type="text" />
                <label >Từ Ngày</label>
                <input type="date" />
                <label >Đến Ngày</label>
                <input type="date" />
                <div className="buttons-container">
                    <button >Xuất Excel</button>
                    <button>Làm mới</button>
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

                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default TonKho;