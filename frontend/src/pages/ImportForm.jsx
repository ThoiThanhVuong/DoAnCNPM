import React from "react";
import "../style/ImportForm.css";
import Textfield from "@atlaskit/textfield";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from 'react-icons/fa';
import { useState } from "react";
import { FaTrash, FaCheck } from 'react-icons/fa';

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

  const deleteIQueue = (id) => {
      const updatedData = queueData.filter((item) => item.masp !== id);
      setQueuedata(updatedData);
  };


  return (
    <div className="cardNhapHang">
      <div className="custom-listSP">
        <p>Danh sách sản phẩm</p>
        <div className="listSP">
          <table>  
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Chip xử lí</th>
                <th>Hệ điều hành</th>
                <th>Dung lượng pin</th>
                <th>Thương hiệu</th>
                <th>Xuất xứ</th>
                <th>Thao tác</th>
              </tr>
            </thead>
              <tbody>
              {data.map((datatable) => (
                <tr key={datatable.id}>
                  <td style={{ width: "5%" }}>{datatable.masp}</td>
                  <td style={{ width: "15%" }}>{datatable.tensp}</td>
                  <td style={{ width: "10%" }}>{datatable.chipxuli}</td>
                  <td style={{ width: "15%" }}>{datatable.hedieuhanh}</td>
                  <td style={{ width: "10%" }}>{datatable.pin}</td>
                  <td style={{ width: "15%" }}>{datatable.thuonghieu}</td>
                  <td style={{ width: "15%" }}>{datatable.xuatxu}</td>
                  <td style={{ width: "10%" }}>
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
          <table style={{ width: "100%"}}>
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
                    <td style={{width: "15%"}}>
                      <div className="custom-icon">
                        <FaEdit className="icEdit"/>
                        <FaCheck className="icOk"/>
                        <FaTrash className="icDelete"
                        onClick={() => deleteIQueue(dataQueue.masp)}
                        />
                      </div>
                    </td>
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

const PhieuNhap = () => {
  const dataPN = [
    {
      id: 1,
      manv: 1,
      mancc: 23,
      time: "3-10-2024",
      tongtien: 10,
      trangthai: 1,
    },
    {
      id: 2,
      manv: 1,
      mancc: 23,
      time: "2-10-2024",
      tongtien: 20,
      trangthai: 1,
    },
    {
      id: 3,
      manv: 1,
      mancc: 23,
      time: "4-10-2024",
      tongtien: 30,
      trangthai: 1,
    },
  ];

  const [StartDatePN, setStartDatePN] = useState("");
  const [EndDatePN, setEndDatePN] = useState("");
  const [searchIDPN, setSearchIDPN] = useState("");
  const [filteredDataPN, setFilteredDataPN] = useState(dataPN);
  const [GiaNhoPN, setGiaNhoPN] = useState("")
  const [GiaLonPN, setGiaLonPN] = useState("")

  const searchPN = () =>{
    const resultsPN = dataPN.filter((item)=>{
      const checkIDPN =  !searchIDPN || item.id.toString().includes(searchIDPN)// trả về true hoặc false
      const tempDatePN = item.time.split("-")
      const valueTimePN = new Date(`${tempDatePN[1]}-${tempDatePN[0]}-${tempDatePN[2]}`)
      const startPN = StartDatePN ? new Date(StartDatePN  + 'T00:00:00') : null
      const endPN = EndDatePN ? new Date(EndDatePN + 'T23:59:59') : null
      const giaStartPN = Number(GiaNhoPN)
      const giaEndPN = Number(GiaLonPN)
      const checkNgayPN = (!startPN || startPN <= valueTimePN) && (!endPN || endPN >= valueTimePN)
      const checkGiaPN = (!giaStartPN || giaStartPN <= item.tongtien) && (!giaEndPN || giaEndPN >= item.tongtien)
      return checkIDPN && checkGiaPN && checkGiaPN
    })
    setFilteredDataPN(resultsPN)
  }

  return(
    <div>
      <div className="Title">Danh Sách Phiếu Nhập</div>
      <div className="boxFind">
          <p>Tìm kiếm</p>
          <div className="custom-ID">
            <p>ID phiếu nhập:</p>
            <Textfield
            className="TF"
            value={searchIDPN}
            onChange={(e) => setSearchIDPN(e.target.value) }
            ></Textfield>
          </div>
          <div className="custom-startDate">
            <p>Từ ngày:</p>
            <input type="date"
              value={StartDatePN}
              onChange={(e)=>setStartDatePN(e.target.value)}
            />
          </div>
          <div className="custom-endDate">
            <p>Đến ngày:</p>
            <input type="date"
              value={EndDatePN}
              onChange={(e)=>setEndDatePN}
            />
          </div>
          <div className="custom-SoTien">
            <p>Phân khúc tổng tiền:</p>
            <input type="text"
              value={GiaNhoPN}
              onChange={(e)=>setGiaNhoPN(e.target.value)}
            />
            <p>-</p>
            <input type="text"
              value={GiaLonPN}
              onChange={(e) => setGiaLonPN(e.target.value)}
            />
          </div>
          <div className="custom-icSearch">
            <FaSearch className="icSearch"
              onClick={searchPN}
            />
          </div> 
      </div> 
      <div className="listPN">
        <table style={{ width: "100%"}} >
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Mã phiếu nhập</th>
              <th style={{ width: "20%" }}>Mã nhân viên</th>
              <th style={{ width: "20%" }}>Mã nhà cung cấp</th>
              <th style={{ width: "20%" }}>Thời gian nhập</th>
              <th style={{ width: "30%" }}>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {filteredDataPN.map((datatable) => (
              <tr key={datatable.id}>
                <td style={{ width: "10%" }}>{datatable.id}</td>
                <td style={{ width: "20%" }}>{datatable.manv}</td>
                <td style={{ width: "20%" }}>{datatable.mancc}</td>
                <td style={{ width: "20%" }}>{datatable.time}</td>
                <td style={{ width: "30%" }}>{datatable.tongtien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

const ImportForm = () => {
  const [activeTab, setActiveTab] = useState("nhaphang")
  const handleTab = (tabName) =>
  {
    setActiveTab(tabName)
  }
  return (
    <div>
      <div className="title-Selection">
        <p className={`titleNH ${activeTab === "nhaphang" ? "selectTab" : ""}`}
        onClick={() => handleTab("nhaphang")}
        >Nhập hàng</p>
        <p className={`titlePN ${activeTab === "phieunhap" ? "selectTab" : ""}`}
        onClick={() => handleTab("phieunhap")}
        >Phiếu Nhập</p>
      </div>
      { activeTab === "nhaphang" ? <NhapHang/> : <PhieuNhap/>}
    </div>
  );
};
export default ImportForm;

