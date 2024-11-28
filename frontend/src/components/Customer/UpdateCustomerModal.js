import React, { useState} from "react";

import axios from "axios";

const UpdateCustomerModal = ({
  showEditCustomer,
  setShow1,
  hiddenEdit,
  formData,
  handleInputChange,
  setSuccessMessage,
  setData,
  setCustomerIds
}) => {
  const [showError, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      // Gửi yêu cầu GET đến API để lấy danh sách khách hàng
      const response = await axios.get("http://localhost:5000/api/customers");

      // Cập nhật state customers với dữ liệu trả về
      setData(response.data.filter((item)=> item.trang_thai == 1));
      // Cập nhật state customerIDs với dữ liệu trả về
      setCustomerIds(response.data.map((item)=>item.ma_kh))
    } catch (err) {
      // Nếu có lỗi, set error
      console.error("Lỗi khi lấy dữ liệu");
      setData();
    }
    // Sau khi lấy xong dữ liệu, cập nhật trạng thái loading
  };


  const updateData = async () => {
    if (!formData.TKH || !formData.DC || !formData.SDT) {
      setError("vui long nhap thong tin!");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      if (!validatePhoneNumber(formData.SDT)) {
        setError("vui long nhap dung SDT!");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setSuccessMessage("Sửa thành công!");
        const payload = {
          ten_kh: formData.TKH,
          dia_chi_kh: formData.DC,
          sdt_kh: formData.SDT,
        };
        await axios.put(
          `http://localhost:5000/api/customers/${formData.MKH}`,
          payload
        );
        fetchCustomers();
        setShow1(!showEditCustomer);
        
        setTimeout(() => {
          setSuccessMessage(""); // Ẩn thông báo
        }, 2000);
      }
    }
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
      <div class="overlay " onClick={() => hiddenEdit()}></div>
      {/* Thông báo thêm thành công với animation */}
      {showError && <div className="error-message">{showError}</div>}
      <div class="form_interface">
        <form class="form_interface_add">
          <div>
            <h1>Sửa Khách Hàng</h1>

            <div class="interface_add-content">
              <input
                placeholder="Nhập Tên"
                name="TKH"
                type="text"
                value={formData.TKH}
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
                placeholder="Nhập Số điện thoại"
                name="SDT"
                type="text"
                value={formData.SDT}
                onChange={handleInputChange}
              ></input>
            </div>

            <div class="button-addCustomer-interface">
              <button type="button" onClick={() => hiddenEdit()}>
                Thoát
              </button>
              <button type="button" onClick={updateData}>
                Sửa
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateCustomerModal;