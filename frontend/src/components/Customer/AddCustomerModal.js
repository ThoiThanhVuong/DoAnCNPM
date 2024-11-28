import React, { useState} from "react";

import axios from "axios";

const AddCustomerModal = ({hiddenAdd, showAddCustomer,formData,handleInputChange,setSuccessMessage,setData,setCustomerIds}) => {
  const [showError, setError] = useState("");


  const fetchCustomers = async () => {
    try {
      // Gửi yêu cầu GET đến API để lấy danh sách khách hàng
      const response = await axios.get("http://localhost:5000/api/customers");

      // Cập nhật state customers với dữ liệu trả về
      setData(response.data.filter((item) => item.trang_thai == 1));
      // Cập nhật state customerIDs với dữ liệu trả về
      setCustomerIds(response.data.map((item) => item.ma_kh));
    } catch (err) {
      // Nếu có lỗi, set error
      console.error("Lỗi khi lấy dữ liệu");
      setData();
    }
    // Sau khi lấy xong dữ liệu, cập nhật trạng thái loading
  };


  const addData = async () => {
    const payload = {
      ma_kh: formData.MKH,
      ten_kh: formData.TKH,
      dia_chi_kh: formData.DC,
      sdt_kh: formData.SDT,
    };
    console.log(validatePhoneNumber(formData.SDT));
    if (!formData.TKH || !formData.TKH || !formData.DC || !formData.SDT) {
      setError("vui long nhap thong tin!");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      if (!validatePhoneNumber(formData.SDT)) {
        setError("vui long nhap dung SDT");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        try {
          await axios.post("http://localhost:5000/api/customers", payload);

          setSuccessMessage("Khách hàng đã được thêm thành công!");
          setTimeout(() => {
            setSuccessMessage(""); // Ẩn thông báo
          }, 2000);
          // Cập nhật lại danh sách khách hàng
          fetchCustomers();
          hiddenAdd();
        } catch (error) {
          setError("Loi trung ma khach hang");
          setTimeout(() => {
            setError(""); // Ẩn thông báo
          }, 2000);
        }
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
      class="interface_add"
      style={{ display: showAddCustomer ? "block" : "none" }}
    >
      <div>
        <div class="overlay " onClick={hiddenAdd}></div>
        {/* Thông báo với animation */}
        {showError && <div className="error-message">{showError}</div>}
      </div>
      <div class="form_interface">
        <form class="form_interface_add">
          <div>
            <h1> Thêm Khách Hàng</h1>
            <div class="interface_add-content">
              <input
                placeholder="Nhập Mã Khách Hàng"
                name="MKH"
                readOnly
                type="number"
                className="inputshow_notcomment"
                value={formData.MKH}
                onChange={handleInputChange}
              ></input>
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
              <button type="button" onClick={hiddenAdd}>
                Thoát
              </button>
              <button type="button" onClick={addData}>
                Thêm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCustomerModal;