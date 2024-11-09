import React, { useState } from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
const Customer = () => {
  const [Data,setData] = useState([
    {
      MKH: 1,
      TKH: "Nguyen Van A",
      DC: "Tp HO CHI MINH",
      SDT: "0394163661",
    },
    {
      MKH: 2,
      TKH: "Nguyen Van B",
      DC: "HN",
      SDT: "0123456789",
    },
    {
      MKH: 3,
      TKH: "Nguyen Van C",
      DC: "Tay Ninh",
      SDT: "0987456123",
    },
    {
      MKH: 4,
      TKH: "Nguyen Van C",
      DC: "Tay Ninh",
      SDT: "0987456123",
    },
    {
      MKH: 5,
      TKH: "Nguyen Van C",
      DC: "Tay Ninh",
      SDT: "0987456123",
    },
  ]);


  const [showAddCustomer, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showEditCustomer, setShow1] = useState(false);
  const [formData,setform]=useState({MKH:" ",TKH:" ",DC:" ",SDT:" "});

  const hiddenAdd = () => {
    setShow(!showAddCustomer);
    setform({MKH:"",TKH:"",DC:"",SDT:""})
  };



  const hiddenEdit = (item) => {
    setShow1(!showEditCustomer);
    setform({MKH:item.MKH,TKH:item.TKH,DC:item.DC,SDT:item.SDT});
  };  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setform((preform) => ({ ...preform, [name]: value }));
  };

  const updateData=(e)=>{
    e.preventDefault();
    setData(
      Data.map((item) =>
        item.MKH === formData.MKH ? formData : item
    )
  );
    setShow1(!showEditCustomer);
    setSuccessMessage("Sửa thành công!");
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const addData=(e)=>{
    e.preventDefault();
    setData((prevData) => [...prevData, formData]);
    setform({MKH:"",TKH:"",DC:"",SDT:""})
    setSuccessMessage("Thêm thành công!");
    setShow(!showAddCustomer);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const deleteData = (mkh) => {
    setData((prevData) => prevData.filter((item) => item.MKH !== mkh));
    setSuccessMessage("Xóa thành công!");
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  return (

    
    <div class="page_customer">

<div>
      {/* Thông báo thêm thành công với animation */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      </div>

      <div>
        <h1>Quản Lý Khách Hàng</h1>
      </div>
      <div class="operation">
        <div class="input-search">
          <input placeholder="Search......"></input>
        </div>

        <div class="button-addCustomer">
          <button onClick={hiddenAdd}>Thêm</button>
        </div>
      </div>

      <div
        class="interface_add"
        style={{ display: showAddCustomer ? "block" : "none" }}
      >
        <div class="overlay " onClick={hiddenAdd}></div>
        <div class="form_interface">
          <form class="form_interface_add">
            <div>
              <h1> Thêm Khách Hàng</h1>
              <div class="interface_add-content">
                <input placeholder="Nhập Mã Khách Hàng" name="MKH" type="number" value={formData.MKH} onChange={handleInputChange}></input>
                <input placeholder="Nhập Tên" name="TKH" type="text" value={formData.TKH}  onChange={handleInputChange}></input>
                <input placeholder="nhập Địa chỉ" name="DC" type="text" value={formData.DC} onChange={handleInputChange}></input>
                <input placeholder="Nhập Số điện thoại" name="SDT" type="text" value={formData.SDT} onChange={handleInputChange}></input>
              </div>
              <div class="button-addCustomer-interface">
                <button type="button" onClick={hiddenAdd}>Thoát</button>
                <button type="button" onClick={addData}>Thêm</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="interface_edit" style={{ display: showEditCustomer ? "block" : "none" }}>
      <div class="overlay " onClick={() => hiddenEdit(" ")}></div>
        <div class="form_interface">
          <form class="form_interface_add">
            <div>
              <h1>Sửa Khách Hàng</h1>
            
              <div  class="interface_add-content">
                <input placeholder="Nhập Tên" name="TKH" type="text" value={formData.TKH} onChange={handleInputChange}></input>
                <input placeholder="nhập Địa chỉ" name="DC" type="text" value={formData.DC} onChange={handleInputChange}></input>
                <input placeholder="Nhập Số điện thoại" name="SDT" type="text" value={formData.SDT} onChange={handleInputChange}></input>
              </div>
              
              <div class="button-addCustomer-interface">
                <button type="button" onClick={() => hiddenEdit(" ")}>Thoát</button>
                <button type="button" onClick={updateData}>Sửa</button>
              </div>
            </div>
          </form>
        </div>
      </div>

     


      <div class="content_customer">
        <table>
          <tr>
            <td>Mã khách hàng</td>
            <td>Tên khách hàng</td>
            <td>Địa chỉ</td>
            <td>Số điện thoại</td>
            <td>Thao Tác</td>
          </tr>
          {Data.map((item, index) => (
            <tr key={index}>
              <td>{item.MKH}</td>
              <td>{item.TKH}</td>
              <td>{item.DC}</td>
              <td>{item.SDT}</td>
              <td>
                <FaEdit onClick={() => hiddenEdit(item)}></FaEdit> <FaTrash onClick={() => deleteData(item.MKH)}></FaTrash>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default Customer;