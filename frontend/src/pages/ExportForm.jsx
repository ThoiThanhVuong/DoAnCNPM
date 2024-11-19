import React, { useEffect } from "react";
import "../style/ExportForm.css";
import Textfield from "@atlaskit/textfield";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { getExports } from "../services/phieuxuatService";
const ExportForm = () => {
  const [dataExport, setDataExport] = useState([]);
  const [StartDatePX, setStartDatePX] = useState("");
  const [EndDatePX, setEndDatePX] = useState("");
  const [searchIDPX, setSearchIDPX] = useState("");
  const [GiaNhoPX, setGiaNhoPX] = useState("");
  const [GiaLonPX, setGiaLonPX] = useState("");
  const [filteredDataPX, setFilteredDataPX] = useState([]);

  useEffect(() => {
    const fectchExport = async () => {
      const data = await getExports();
      const formattedData = data.map((item) => {
        const date = new Date(item.thoi_gian_xuat); // Chuyển đổi chuỗi ngày thành đối tượng Date
        // Định dạng lại ngày theo kiểu "DD/MM/YYYY"
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return { ...item, thoi_gian_xuat: formattedDate }; // Trả về item với ngày đã được định dạng lại
      });
      setDataExport(formattedData);
      setFilteredDataPX(formattedData);
    };
    fectchExport();
  }, []);
  const SearchPX = () => {
    const resultsPX = dataExport.filter((item) => {
      const checkIDPX = item.ma_px.toString().includes(searchIDPX)// tìm có chứa kí tự
      //const checkIDPX = item.ma_px.toString() === searchIDPX.trim(); // tìm duy nhất
      const tempdatePX = item.thoi_gian_xuat.split("/"); // cắt chuỗi theo dấu "-"
      const itemDatePX = new Date(
        `${tempdatePX[1]}-${tempdatePX[0]}-${tempdatePX[2]}`
      ); // định dạng tháng/ngày/năm theo input
      const startPX = StartDatePX ? new Date(StartDatePX + "T00:00:00") : null; // đặt về 00h ngày hôm đó
      const endPX = EndDatePX ? new Date(EndDatePX + "T23:59:59") : null; // đặt về cuối ngày hôm đó
      const giaStartPX = Number(GiaNhoPX);
      const giaEndPX = Number(GiaLonPX);
      const checkGiaPX =
        (!giaStartPX || item.tong_tien >= giaStartPX) &&
        (!giaEndPX || item.tong_tien <= giaEndPX);
      const checkNgayPX =
        (!startPX || itemDatePX >= startPX) && (!endPX || itemDatePX <= endPX);
      return checkGiaPX && checkNgayPX && checkIDPX;
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
          <input
            type="date"
            value={StartDatePX}
            onChange={(e) => setStartDatePX(e.target.value)}
          />
        </div>
        <div className="custom-endDate">
          <p>Đến ngày:</p>
          <input
            type="date"
            value={EndDatePX}
            onChange={(e) => setEndDatePX(e.target.value)}
          />
        </div>
        <div className="custom-SoTien">
          <p>Phân khúc tổng tiền:</p>
          <input
            type="text"
            value={GiaNhoPX}
            onChange={(e) => setGiaNhoPX(e.target.value)}
          />
          <p>-</p>
          <input
            type="text"
            value={GiaLonPX}
            onChange={(e) => setGiaLonPX(e.target.value)}
          />
        </div>
        <div className="custom-icSearch">
          <FaSearch className="icSearch" onClick={SearchPX} />
        </div>
      </div>
      <div className="listPX">
        <table style={{ width: "100%" }}>
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
              <tr key={datatable.ma_px}>
                <td style={{ width: "10%" }}>{datatable.ma_px}</td>
                <td style={{ width: "20%" }}>{datatable.ma_nv}</td>
                <td style={{ width: "20%" }}>{datatable.ma_kh}</td>
                <td style={{ width: "20%" }}>{datatable.thoi_gian_xuat}</td>
                <td style={{ width: "30%" }}>{datatable.tong_tien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ExportForm;
