import React from "react";
import "../style/ExportForm.css";
import Textfield from "@atlaskit/textfield";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
const ExportForm = () => {
  const dataPX = [
    {
      id: 1,
      manv: 1,
      makh: 23,
      time: "3-10-2024",
      tongtien: 10,
      trangthai: 1,
    },
    {
      id: 2,
      manv: 1,
      makh: 23,
      time: "2-10-2024",
      tongtien: 20,
      trangthai: 1,
    },
    {
      id: 3,
      manv: 1,
      makh: 23,
      time: "4-10-2024",
      tongtien: 30,
      trangthai: 1,
    },
  ];
  const [StartDatePX, setStartDatePX] = useState("");
  const [EndDatePX, setEndDatePX] = useState("");
  const [searchIDPX, setSearchIDPX] = useState("");
  const [filteredDataPX, setFilteredDataPX] = useState(dataPX);
  const [GiaNhoPX, setGiaNhoPX] = useState("")
  const [GiaLonPX, setGiaLonPX] = useState("")
  const SearchPX = () => {

    const resultsPX = dataPX.filter((item) =>{
      const checkIDPX = item.id.toString().includes(searchIDPX)
      const tempdatePX = item.time.split("-")// cắt chuỗi theo dấu "-"
      const itemDatePX = new Date(`${tempdatePX[1]}-${tempdatePX[0]}-${tempdatePX[2]}`);// định dạng tháng/ngày/năm theo input 
      const startPX = StartDatePX ? new Date(StartDatePX + 'T00:00:00') : null; // đặt về 00h ngày hôm đó
      const endPX = EndDatePX ? new Date(EndDatePX + 'T23:59:59') : null; // đặt về cuối ngày hôm đó
      const giaStartPX = Number(GiaNhoPX)
      const giaEndPX = Number(GiaLonPX)
      const checkGiaPX = (!giaStartPX || item.tongtien >= giaStartPX) && (!giaEndPX || item.tongtien <= giaEndPX)
      const checkNgayPX = (!startPX || itemDatePX >= startPX) && (!endPX || itemDatePX <= endPX)
      return checkGiaPX && checkNgayPX && checkIDPX
  });
    setFilteredDataPX(resultsPX);
  };
  return (
    <div>
      <div className="Title">Danh Sách Phiếu Xuất</div>
      <div className="boxFind">
          <p>Tìm kiếm</p>
          <div className="custom-ID">
            <p>ID phiếu xuất:</p>
            <Textfield
            className="TF"
            value={searchIDPX}
            onChange={(e) => setSearchIDPX(e.target.value)}
            ></Textfield>
          </div>
          <div className="custom-startDate">
            <p>Từ ngày:</p>
            <input type="date" 
              value={StartDatePX}
              onChange={(e)=> setStartDatePX(e.target.value)}/>
          </div>
          <div className="custom-endDate">
            <p>Đến ngày:</p>
            <input type="date"
            value={EndDatePX}
            onChange={(e)=> setEndDatePX(e.target.value)}/>
          </div>
          <div className="custom-SoTien">
            <p>Phân khúc tổng tiền:</p>
            <input type="text" 
              value={GiaNhoPX}
              onChange={(e) => setGiaNhoPX(e.target.value)}
            />
            <p>-</p>
            <input type="text" 
              value={GiaLonPX}
              onChange={(e) => setGiaLonPX(e.target.value)}
            />
          </div>
          <div className="custom-icSearch">
            <FaSearch className="icSearch" onClick={SearchPX}/>
          </div> 
      </div> 
      <div className="listPX">
        <table style={{ width: "100%"}} >
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Mã phiếu xuất</th>
              <th style={{ width: "20%" }}>Mã nhân viên</th>
              <th style={{ width: "20%" }}>Mã khách hàng</th>
              <th style={{ width: "20%" }}>Thời gian xuất</th>
              <th style={{ width: "30%" }}>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataPX.map((datatable) => (
              <tr key={datatable.id}>
                <td style={{ width: "10%" }}>{datatable.id}</td>
                <td style={{ width: "20%" }}>{datatable.manv}</td>
                <td style={{ width: "20%" }}>{datatable.makh}</td>
                <td style={{ width: "20%" }}>{datatable.time}</td>
                <td style={{ width: "30%" }}>{datatable.tongtien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ExportForm;
