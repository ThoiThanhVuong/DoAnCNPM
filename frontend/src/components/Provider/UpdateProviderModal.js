import React, { useState} from "react";

import axios from "axios";

const UpdateProviderModal = ({formData,setSuccessMessage,hiddenEdit,fetchProviders,showEditCustomer,handleInputChange}) =>{
    const [showError, setError] = useState("");

    //cập nhật Nhà cung cấp
  const updateProvider = async () => {
    if (!formData.TNCC || !formData.DC || !formData.Email || !formData.SDT) {
      setError("Vui lòng nhập thông tin!");
      setTimeout(() => {
        setError(""); // Ẩn thông báo
      }, 2000);
    } else {
      if (!validateEmail(formData.Email)) {
        setError("Vui lòng nhập đúng Email!");
        setTimeout(() => {
          setError(""); // Ẩn thông báo
        }, 2000);
      } else {
        if (!validatePhoneNumber(formData.SDT)) {
          setError("Vui lòng nhập đúng SDT!");
          setTimeout(() => {
            setError(""); // Ẩn thông báo
          }, 2000);
        } else {
          const payload = {
            ten_ncc: formData.TNCC,
            dia_chi: formData.DC,
            email_ncc: formData.Email,
            sdt_ncc: formData.SDT,
          };
          await axios.put(
            `http://localhost:5000/api/providers/${formData.MNCC}`,
            payload
          );
          setSuccessMessage("Sửa thành công");
          setTimeout(() => {
            setSuccessMessage(""); // Ẩn thông báo
          }, 1500);
          hiddenEdit("");
          fetchProviders();
        }
      }
    }
  };

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
        class="interface_edit"
        style={{ display: showEditCustomer ? "block" : "none" }}
      >
        <div class="overlay " onClick={() => hiddenEdit(" ")}></div>
        {/* Thông báo với animation */}
        {showError && <div className="error-message">{showError}</div>}
        <div class="form_interface">
          <form class="form_interface_add">
            <div>
              <h1>Sửa Khách Hàng</h1>

              <div class="interface_add-content">
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
                  placeholder="nhập Email"
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
                <button type="button" onClick={() => hiddenEdit(" ")}>
                  Thoát
                </button>
                <button type="button" onClick={updateProvider}>
                  Sửa
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}
export default UpdateProviderModal;