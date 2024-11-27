import React, { useState} from "react";

import axios from "axios";

const AddProviderModal = ({setData,setProviderIds,formData,setSuccessMessage,hiddenAdd,showAdd,handleInputChange,fetchProviders}) =>{
    const [showError, setError] = useState("");

        //Thêm Nhà Cung Cấp
  const addProvider = async () => {
    if(!formData.MNCC||!formData.TNCC||!formData.DC||!formData.Email||!formData.SDT){
      setError("Vui lòng nhập thông tin!");
      setTimeout(() => {
      setError(""); // Ẩn thông báo
      }, 2000);
    }else{
      if(!validatePhoneNumber(formData.SDT)){
        setError("Vui lòng nhập đúng SDT!");
        setTimeout(() => {
        setError(""); // Ẩn thông báo
        }, 2000);
      }else{
        if(!validateEmail(formData.Email)){
        setError("Vui lòng nhập đúng Email!");
        setTimeout(() => {
        setError(""); // Ẩn thông báo
        }, 2000);
        }else{
          try {
            const payload ={
              ma_ncc : formData.MNCC,
              ten_ncc : formData.TNCC,
              dia_chi : formData.DC,
              email_ncc : formData.Email,
              sdt_ncc : formData.SDT
            }
            await axios.post("http://localhost:5000/api/providers",payload)
            setSuccessMessage("Thêm thành công");
            setTimeout(() => {
              setSuccessMessage(""); // Ẩn thông báo
            }, 1500);
            fetchProviders();
            hiddenAdd();
          } catch (error) {
            setError("Mã Nhà Cung Cấp bị Trùng!");
            setTimeout(() => {
            setError(""); // Ẩn thông báo
            }, 2000);
          }
        }
      }
    }
  }
 // Hàm kiểm tra Email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

 // Hàm kiểm tra số điện thoại
 const validatePhoneNumber = (phone) => {
  const regex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/; // Định dạng hợp lệ hơn
// Định dạng cho số điện thoại Việt Nam
  return regex.test(phone);
};
    return (
<div
        class="interface_add"
        style={{ display: showAdd ? "block" : "none" }}
      >
        <div class="overlay " onClick={hiddenAdd}></div>
        {/* Thông báo với animation */}
        {showError && <div className="error-message">{showError}</div>}
        <div class="form_interface">
          <form class="form_interface_add">
            <div>
              <h1> Thêm Khách Hàng</h1>
              <div class="interface_add-content">
                <input
                  placeholder="Nhập Mã Nhà Cung Cấp"
                  name="MNCC"
                  type="number"
                  readOnly
                  className="inputshow_notcomment"
                  value={formData.MNCC}
                  onChange={handleInputChange}
                ></input>
                <input
                  placeholder="Nhập Tên Nhà Cung Cấp"
                  name="TNCC"
                  type="text"
                  value={formData.TNCC}
                  onChange={handleInputChange}
                ></input>
                <input
                  placeholder="nhập Địa chỉ"
                  name="DC"
                  type="text"
                  value={formData.DC}
                  onChange={handleInputChange}
                ></input>
                <input
                  placeholder="Nhập Email"
                  name="Email"
                  type="text"
                  value={formData.Email}
                  onChange={handleInputChange}
                ></input>
                <input
                  placeholder="Nhập Số điện thoại"
                  name="SDT"
                  type="text"
                  value={formData.SDT}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div class="button-addCustomer-interface">
                <button type="button" onClick={hiddenAdd}>
                  Thoát
                </button>
                <button type="button" onClick={addProvider}>Thêm</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default AddProviderModal;