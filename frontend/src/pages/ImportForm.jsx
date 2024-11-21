import React, { useEffect } from "react";
import "../style/ImportForm.css";
import Textfield from "@atlaskit/textfield";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaEdit } from 'react-icons/fa';
import { useState } from "react";
import { FaTrash, FaCheck, FaStore } from 'react-icons/fa';
import productService from '../services/productService';
import {getpbSP}  from "../services/phienbanSanPhamService";
import {getAllprovider} from "../services/providerService"


const SoLuongGiaNhap = ({handleCancel,handleOK, soLuong, setSoluong, giaNhap, setGiaNhap, error}) =>{
  return (
    <div className="ctn">
      <div className="custom-SL-GN">
        <div className="custom-SL">
          <p>Nhập số lượng:</p>
          <input type="text" className="ipSL" placeholder="Nhập số lượng"
            value={soLuong}
            onChange={(e)=>setSoluong(e.target.value)}
          />
          {error && <p className="err">{error}</p>} {/* Hiển thị lỗi */}
        </div>
        {/* <div className="custom-GN">
          <p>Giá nhập vào:</p>
          <input type="text" className="ipGN" placeholder="Giá muốn nhập vào"
           value={giaNhap}
           onChange={(e)=>setGiaNhap(e.target.value)}
           />
        </div> */}
        <div className="custom-btyn">
          <button className="bty" onClick={handleOK}>Đồng ý</button>
          <button className="btn" onClick={handleCancel}>Hủy</button>
        </div>
      </div>
    </div>
  )
}
const NhapHang = () => {
  const [dataProduct, setDataProduct] = useState([])
  const [dataPBSanPham, setdataPBSanPham] = useState([])
  const [queueData, setQueuedata] = useState([])
  const [soLuong, setSoluong] = useState("")
  const [giaNhap, setGiaNhap] = useState("")
  const [showNotification, setShowNotification] = useState();
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [dataProvider, setdataProvider] = useState([])

  useEffect (() => {
    const fetchProducts = async () => {
      const dataProd = await productService.getAllProducts();
      setDataProduct(dataProd.data);
      const dataPB = await getpbSP();
      setdataPBSanPham(dataPB)
      const dataPV = await getAllprovider();
      console.log("NCC: ",dataPV)
      setdataProvider(dataPV)
    }; 
    fetchProducts();
  }, [])

  const findNameProd = (ma_sp) => {
    const product = dataProduct.find((item) => item.ma_sp === ma_sp);
    return product ? product.ten_sp : "";
  };

  const handleToggleNotification = (ma_phien_ban_sp) => {
    setShowNotification(ma_phien_ban_sp);
    setShowOverlay(true);
  };

  const handleCancel = () => {
    setShowNotification(null);
    setShowOverlay(false);
    setGiaNhap("")
    setSoluong("")
  };

  const handleOK = (showNotification) => {
    const checkNguyenDuong = () => {
      if( !soLuong || !soLuong.match(/^(?!0)\d+$/))
      {
        setError("Số lượng phải là số nguyên dương và lớn hơn 0")
        return;
      }
      else{
        setError("")
        const data = dataPBSanPham.find((item)=>item.ma_phien_ban_sp === showNotification)
        const newData ={
          ma_sp : data.ma_sp,
          ma_phien_ban_sp: data.ma_phien_ban_sp,
          ten_sp : dataProduct.find((item) => item.ma_sp === data.ma_sp)?.ten_sp,
          so_luong: parseInt(soLuong),
          gia_nhap: data.gia_nhap,
          tong_tien: parseInt(soLuong) * parseInt(data.gia_nhap)
        };
        if(queueData.find((item)=>item.ma_phien_ban_sp === newData.ma_phien_ban_sp))
          {
            const updatedQueue = queueData.map((item) =>
              item.ma_phien_ban_sp === data.ma_phien_ban_sp
                ? {
                    ...item,
                    so_luong: parseInt(item.so_luong) + parseInt(soLuong),
                    tong_tien: (parseInt(item.so_luong) + parseInt(soLuong)) * parseInt(item.gia_nhap),
                  }
                : item
            );
            setQueuedata(updatedQueue);
          }
          else{
            setQueuedata([...queueData, newData]);
          }
          handleCancel();
      }
    }
    checkNguyenDuong()
  }

  const deleteIQueue = (ma_phien_ban_sp) => {
      const updatedData = queueData.filter((item) => item.ma_phien_ban_sp !== ma_phien_ban_sp);
      setQueuedata(updatedData);
  };
  if(!dataPBSanPham || dataPBSanPham.length === 0)
  {
    return null;
  }
 
  if(!dataProvider || dataProvider.length === 0)
    {
      return null;
    }
  const deleteAll = () =>{
    setQueuedata([])
  }

  const DuyetPN = () => {
    const newPN = {
      ma_pn: 1,
      ma_nv: 1,
      ma_ncc: 1,
      thoi_gian_nhap: 1,
      tong_tien: 1,
    }
  }

  return (
    <div className="cardNhapHang">
      <div className="custom-listSP">
        <p>Danh sách sản phẩm</p>
        <div className="listSP">
          <table>  
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Mã phiên bản</th>
                <th>Tên sản phẩm</th>
                <th>Giá nhập</th>
                <th>Giá xuất</th>
                <th>tồn kho</th>
                <th>Thao tác</th>
              </tr>
            </thead>
              <tbody>
              {dataPBSanPham.map((datatable) => (
                <tr key={datatable.ma_phien_ban_sp}>
                  <td style={{ width: "10%" }}>{datatable.ma_sp}</td>
                  <td style={{ width: "10%" }}>{datatable.ma_phien_ban_sp}</td>
                  <td style={{ width: "25%" }}>{findNameProd(datatable.ma_sp)}</td>
                  <td style={{ width: "15%" }}>{datatable.gia_nhap.toLocaleString("vi-VN")} VNĐ</td>
                  <td style={{ width: "15%" }}>{datatable.gia_xuat.toLocaleString("vi-VN")} VNĐ</td>
                  <td style={{ width: "15%" }}>{datatable.ton_kho}</td>
                  <td style={{ width: "10%" }}>
                    <div className="custom-icAdd">
                      <FaPlus className="iconAdd" onClick={() => handleToggleNotification(datatable.ma_phien_ban_sp)}/>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          { showOverlay && (<div>
            <div className="overlay"></div>
              <SoLuongGiaNhap handleCancel={handleCancel} 
              handleOK={()=>handleOK(showNotification)} 
              soLuong={soLuong} 
              setSoluong={setSoluong} 
              giaNhap={giaNhap} 
              setGiaNhap={setGiaNhap}
              error={error}
              />
            </div>)
          }
        </div>
      </div>

      <div className="custom-queue">
        <p>Hàng chờ nhập</p>
        <div className="custom-tb-evtb">
        <div className="queue">
          <table style={{ width: "100%"}}>
            <thead>
              <tr>
                <th style={{width: "10%"}}>Mã sản phẩm</th>
                <th style={{width: "10%"}}>Mã phiên bản</th>
                <th style={{width: "20%"}}>Tên sản phẩm</th>
                <th style={{width: "15%"}}>Đơn giá nhập</th>
                <th style={{width: "10%"}}>Số lượng</th>
                <th style={{width: "20%"}}>Tổng tiền (VND)</th>
                <th style={{width: "15%"}}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                queueData.map((dataQueue)=>
                (
                  <tr key={dataQueue.masp}>
                    <td style={{width: "10%"}}>{dataQueue.ma_sp}</td>
                    <td style={{width: "10%"}}>{dataQueue.ma_phien_ban_sp}</td>
                    <td style={{width: "20%"}}>{dataQueue.ten_sp}</td>
                    <td style={{width: "15%"}}>{dataQueue.gia_nhap.toLocaleString("vi-VN")} VNĐ</td>
                    <td style={{width: "10%"}}>{dataQueue.so_luong}</td>
                    <td style={{width: "20%"}}>{dataQueue.tong_tien.toLocaleString("vi-VN")} VNĐ</td>
                    <td style={{width: "15%"}}>
                      <div className="custom-icon">
                        <FaTrash className="icDelete"
                        onClick={() => deleteIQueue(dataQueue.ma_phien_ban_sp)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className="ev">
          <button className="evAll1" onClick={deleteAll}>
            <FaTrash className="icAll"/>
            <p>Xóa tất cả</p>
          </button>
          <select className="supplier" value={selectedSupplier} onChange={(e)=>setSelectedSupplier(e.target.value)}>
              {dataProvider.map((supplier) => (
              <option key={supplier.ma_ncc} value={supplier.ma_ncc}>
              {supplier.ma_ncc}: {supplier.ten_ncc}
          </option>
          ))}
          </select>
          <button className="evAll3">
            <FaStore className="icAll"/>
            <p>Duyệt</p>
          </button>
        </div>
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
      return checkIDPN && checkGiaPN && checkNgayPN
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

