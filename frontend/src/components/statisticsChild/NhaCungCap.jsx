import React,{useState} from "react";
import '../statisticsChild/statisticChild.css';
const NhaCungCap = ()=> {

    return (
        <div className="statistics-page">
            <div className="filters-container">
                <label>Tìm kiếm nhà cung cấp</label>
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
                            <th>Mã nhà cung cấp</th>
                            <th>Tên nhà cung cấp</th>
                            <th>Số lượng nhập</th>
                            <th>Tổng số tiền</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default NhaCungCap;