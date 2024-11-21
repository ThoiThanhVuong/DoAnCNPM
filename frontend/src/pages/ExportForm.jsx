import React, { useEffect } from "react";
import "../style/ExportForm.css";
import "../style/ImportForm.css";
import "../style/Customer.css";
import Textfield from "@atlaskit/textfield";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { getExports } from "../services/phieuxuatService";
import { getDetailPX} from "../services/chitietPhieuXuatService";

const ExportForm = () => {
  const [dataExport, setDataExport] = useState([]);
  const [StartDatePX, setStartDatePX] = useState("");
  const [EndDatePX, setEndDatePX] = useState("");
  const [searchIDPX, setSearchIDPX] = useState("");
  const [GiaNhoPX, setGiaNhoPX] = useState("");
  const [GiaLonPX, setGiaLonPX] = useState("");
  const [filteredDataPX, setFilteredDataPX] = useState([]);
  const [showdetail, setShowDetail] = useState();
  const [dataDetailPX, setDataDetailPX] = useState([]);
  const [showOVlay, setShowOVlay] = useState(false);

  const handleRowClick = (id) => {
    setShowDetail(id);
    GETDATA(id);
    setShowOVlay(true)
  };
  const handleCancel = () => {
    setShowDetail(null);
    setShowOVlay(false);
  }

  const GETDATA = async (id) => {
    const data = await getDetailPX(id);
    if (data) {
      console.log("Lấy được dữ liệu: ", data);
      setDataDetailPX(data);
    }
  };

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
              <tr key={datatable.ma_px} onClick={()=>handleRowClick(datatable.ma_px)}>
                <td >{datatable.ma_px}</td>
                <td >{datatable.ma_nv}</td>
                <td >{datatable.ma_kh}</td>
                <td >{datatable.thoi_gian_xuat}</td>
                <td >{datatable.tong_tien.toLocaleString("vi-VN")} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showOVlay && (
        <div>
          <div className="overlay" onClick={handleCancel}></div>
          <DetailPX data={dataDetailPX} handleCancel={handleCancel} />
        </div>
      )}
    </div>
  );
};
const DetailPX = ({data, handleCancel}) =>{
  if (!data || data.length === 0) {
    return null; // Hoặc hiển thị một thông báo lỗi phù hợp
  }
  const totalMoney = data.reduce((total, item) => {
    return total + item.so_luong * item.gia_xuat;
  }, 0);
  return(
    <div className="detailPX">
      <div className="boxCTPX">
        <h3>Chi tiết hóa đơn</h3>
        <h4>Mã hóa đơn: {data[0].ma_px}</h4>
        <div className="content_customer format_table_CTPX">
          <table>
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá bán</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datatable)=>(
                <tr>
                  <td>{datatable.ma_phien_ban_sp}</td>
                  <td>{datatable.so_luong}</td>
                  <td>{datatable.gia_xuat.toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="totalMoney">Tổng Tiền: {totalMoney.toLocaleString("vi-VN")} VNĐ </div>
        <div className="btn-OK" onClick={handleCancel}>Đồng ý</div>
      </div>
    </div>
  )
}
export default ExportForm;
