import React from "react";
import "../style/ImportForm.css";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
const SoLuongGiaNhap = ({handleCancel,handleOK, soLuong, setSoluong, giaNhap, setGiaNhap}) =>{
  return (
    <div className="ctn">
      <div className="custom-SL-GN">
        <div className="custom-SL">
          <p>Nhập số lượng:</p>
          <input type="text" className="ipSL" placeholder="Nhập số lượng"
            value={soLuong}
            onChange={(e)=>setSoluong(e.target.value)}
          />
        </div>
        <div className="custom-GN">
          <p>Giá nhập vào:</p>
          <input type="text" className="ipGN" placeholder="Giá muốn nhập vào"
           value={giaNhap}
           onChange={(e)=>setGiaNhap(e.target.value)}
           />
        </div>
        <div className="custom-btyn">
          <button className="bty" onClick={handleOK}>Đồng ý</button>
          <button className="btn" onClick={handleCancel}>Hủy</button>
        </div>
      </div>
    </div>
  )
}
const NhapHang = () => {
  const data = [
    {
      masp: 1,
      tensp: "test1",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
    {
      masp: 2,
      tensp: "test2",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
    {
      masp: 3,
      tensp: "test2",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
    {
      masp: 4,
      tensp: "test2",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
    {
      masp: 5,
      tensp: "test2",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
    {
      masp: 6,
      tensp: "test2",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
    {
      masp: 7,
      tensp: "test2",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
    {
      masp: 8,
      tensp: "test2",
      chipxuli: "snapdragon",
      hedieuhanh: "android",
      pin: "5000mah",
      thuonghieu: "xiaomi",
      xuatxu: "trung quoc",
    },
  ];
  const [queueData, setQueuedata] = useState([])
  const [soLuong, setSoluong] = useState("")
  const [giaNhap, setGiaNhap] = useState("")
  const [showNotification, setShowNotification] = useState();
  const [showOverlay, setShowOverlay] = useState(false);


  const handleToggleNotification = (id) => {
    setShowNotification(id);
    setShowOverlay(true);
  };


  const handleCancel = () => {
    setShowNotification(null);
    setShowOverlay(false);
    setGiaNhap("")
    setSoluong("")
  };

  const handleOK = () => {
    const newDate ={
      masp : showNotification,
      tensp : data.find((item) => item.masp === showNotification)?.tensp,
      soluong: soLuong,
      gianhap: giaNhap,
      tongtien: parseInt(soLuong) * parseInt(giaNhap)
    };
    setQueuedata([...queueData, newDate]);
    handleCancel();
  }

  return (
    <div className="cardNhapHang">
      <div className="custom-listSP">
        <p>Danh sách sản phẩm</p>
        <div className="listSP">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ width: "10%"}}>Mã sản phẩm</th>
                <th style={{ width: "15%"}}>Tên sản phẩm</th>
                <th style={{ width: "10%"}}>Chip xử lí</th>
                <th style={{ width: "5%"}}>Hệ điều hành</th>
                <th style={{ width: "15%"}}>Dung lượng pin</th>
                <th style={{ width: "15%"}}>Thương hiệu</th>
                <th style={{ width: "15%"}}>Xuất xứ</th>
                <th style={{ width: "15%"}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datatable) => (
                <tr key={datatable.id}>
                  <td style={{ width: "10%" }}>{datatable.masp}</td>
                  <td style={{ width: "15%" }}>{datatable.tensp}</td>
                  <td style={{ width: "10%" }}>{datatable.chipxuli}</td>
                  <td style={{ width: "5%" }}>{datatable.hedieuhanh}</td>
                  <td style={{ width: "15%" }}>{datatable.pin}</td>
                  <td style={{ width: "15%" }}>{datatable.thuonghieu}</td>
                  <td style={{ width: "15%" }}>{datatable.xuatxu}</td>
                  <td style={{ width: "15%" }}>
                    <div className="custom-icAdd">
                      <FaPlus className="iconAdd" onClick={() => handleToggleNotification(datatable.masp)}/>
                      { showNotification === datatable.masp && showOverlay && (<div>
                        <div className="overlay"></div>
                        <SoLuongGiaNhap handleCancel={handleCancel} handleOK={handleOK} soLuong={soLuong} 
                        setSoluong={setSoluong} giaNhap={giaNhap} setGiaNhap={setGiaNhap}/>
                      </div>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="custom-queue">
        <p>Hàng chờ nhập</p>
        <div className="queue">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{width: "15%"}}>Mã sản phẩm</th>
                <th style={{width: "15%"}}>Tên sản phẩm</th>
                <th style={{width: "15%"}}>Đơn giá nhập</th>
                <th style={{width: "15%"}}>Số lượng</th>
                <th style={{width: "25%"}}>Tổng tiền (VND)</th>
                <th style={{width: "15%"}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                queueData.map((dataQueue)=>
                (
                  <tr key={dataQueue.masp}>
                    <td style={{width: "15%"}}>{dataQueue.masp}</td>
                    <td style={{width: "15%"}}>{dataQueue.tensp}</td>
                    <td style={{width: "15%"}}>{dataQueue.gianhap}</td>
                    <td style={{width: "15%"}}>{dataQueue.soluong}</td>
                    <td style={{width: "25%"}}>{dataQueue.tongtien}</td>
                    <td style={{width: "15%"}}>test</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const ImportForm = () => {
  return (
    <div>
      <div className="title-Selection">
        <p className="titleNH">Nhập hàng</p>
        <p className="titlePN">Phiếu Nhập</p>
      </div>
      <NhapHang/>
    </div>
  );
};
export default ImportForm;
