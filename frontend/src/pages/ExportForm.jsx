import React from "react";
import "../style/ExportForm.css";
import Textfield from "@atlaskit/textfield";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
const ExportForm = () => {
  const data = [
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
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [searchID, setSearchID] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [GiaNho, setGiaNHo] = useState("")
  const [GiaLon, setGiaLon] = useState("")
  const SearchIDPX = () => {

    const results = data.filter((item) =>{
      const checkID = item.id.toString().includes(searchID)
      const tempdate = item.time.split("-")
      const itemDate = new Date(`${tempdate[1]}-${tempdate[0]}-${tempdate[2]}`);// định dạng tháng/ngày/năm theo input 
      const start = StartDate ? new Date(StartDate + 'T00:00:00') : null; // đặt về 00h ngày hôm đó
      const end = EndDate ? new Date(EndDate + 'T23:59:59') : null; // đặt về cuối ngày hôm đó
      const giaStart = Number(GiaNho)
      const giaEnd = Number(GiaLon)
      const checkGia = (!giaStart || item.tongtien >= giaStart) && (!giaEnd || item.tongtien <= giaEnd)
      const checkNgay = (!start || itemDate >= start) && (!end || itemDate <= end)
      return checkGia && checkNgay && checkID
  });
    setFilteredData(results);
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
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            ></Textfield>
          </div>
          <div className="custom-startDate">
            <p>Từ ngày:</p>
            <input type="date" 
              value={StartDate}
              onChange={(e)=> setStartDate(e.target.value)}/>
          </div>
          <div className="custom-endDate">
            <p>Đến ngày:</p>
            <input type="date"
            value={EndDate}
            onChange={(e)=> setEndDate(e.target.value)}/>
          </div>
          <div className="custom-SoTien">
            <p>Phân khúc tổng tiền:</p>
            <input type="text" 
              value={GiaNho}
              onChange={(e) => setGiaNHo(e.target.value)}
            />
            <p>-</p>
            <input type="text" 
              value={GiaLon}
              onChange={(e) => setGiaLon(e.target.value)}
            />
          </div>
          <div className="custom-icSearch">
            <FaSearch className="icSearch" onClick={SearchIDPX}/>
          </div> 
      </div> 
      <div className="listPX">
        <table style={{ width: "100%", borderCollapse: "collapse" }} border="1">
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
            {filteredData.map((datatable) => (
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
