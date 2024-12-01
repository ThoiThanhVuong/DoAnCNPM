import React, { useState, useEffect } from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import AddCustomerModal from "../components/Customer/AddCustomerModal";
import UpdateCustomerModal from "../components/Customer/UpdateCustomerModal";
import AYSCustomerModal from "../components/Customer/AYSCustomerModal";
import SearchCustomerModal from "../components/Customer/SearchCustomerModal";
const Customer = () => {
  const [Data, setData] = useState([]);
  const [showAddCustomer, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditCustomer, setShow1] = useState(false);
  const [showAYS, setAYS] = useState(false);
  const [customerIds, setCustomerIds] = useState([]);
  const [formData, setform] = useState({
    MKH: "",
    TKH: "",
    DC: "",
    SDT: "",
  });
  const [search, setSearch] = useState({
    MKH: "",
  });
  const [errorInput,setErrorInput] = useState([false],[false],[false])
  const fetchCustomers = async () => {
    try {
      // Gửi yêu cầu GET đến API để lấy danh sách khách hàng
      const response = await axios.get("http://localhost:5000/api/customers");

      console.log(response)
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
  useEffect(() => {
    fetchCustomers();
  }, []);

  const hiddenAdd = () => {
    setShow(!showAddCustomer);
    setform({
      MKH: generateNewCustomerId(),
      TKH: "",
      DC: "",
      SDT: "",
    });
    setErrorInput((prevErrors) => {
      const newErrors = prevErrors.map(() => false);
      return newErrors;
    });
  };

  const generateNewCustomerId = () => {
    if (customerIds.length === 0) return 1; // Nếu chưa có ID, bắt đầu từ KH1
    const lastId = customerIds[customerIds.length - 1]; // Lấy ID cuối cùng
    return `${lastId + 1}`; // Tăng giá trị số và thêm tiền tố
  };

  const handleEdit = (item) => {
    setShow1(!showEditCustomer);
    setform({
      MKH: item.ma_kh,
      TKH: item.ten_kh,
      DC: item.dia_chi_kh,
      SDT: item.sdt_kh,
    });
  };

  const hiddenEdit = () => {
    setShow1(!showEditCustomer);
    setform({
      MKH: "",
      TKH: "",
      DC: "",
      SDT: "",
    });
    setErrorInput((prevErrors) => {
      const newErrors = prevErrors.map(() => false);
      return newErrors;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setform({
      ...formData,
      [name]: value,
    });
  };

  const deleteData = async (MKH) => {

    setSuccessMessage(" Xóa thành công!");
    await axios.delete(`http://localhost:5000/api/customers/${MKH}`);
    fetchCustomers();
    setform({
      MKH: "",
      TKH: "",
      DC: "",
      SDT: "",
    });
    setAYS(!showAYS);
    setSearch({ MKH: "" });
    setTimeout(() => {
      setSuccessMessage(""); // Ẩn thông báo
    }, 2000);
  };

  const handleAYS = (MKH) => {
    setAYS(!showAYS);
    setform({
      MKH: MKH,
      TKH: "",
      DC: "",
      SDT: "",
    });
  };



  return (
    <div class="page_customer">
      <div>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
      </div>

      <div>
        <h1>Quản Lý Khách Hàng</h1>
      </div>
      <div class="operation">
        {/* form search */}
        <SearchCustomerModal
          setSearch={setSearch}
          setData={setData}
          search={search}
        />
        
        <div class="button-addCustomer" >
          <button onClick={hiddenAdd}>Thêm</button>
        </div>
      </div>

      {/* form Thêm */}
      <AddCustomerModal
        hiddenAdd={hiddenAdd}
        showAddCustomer={showAddCustomer}
        formData={formData}
        handleInputChange={handleInputChange}
        setSuccessMessage={setSuccessMessage}
        setData={setData}
        setCustomerIds={setCustomerIds}
        errorInput={errorInput}
        setErrorInput={setErrorInput}
      />

      {/* form Sửa */}
      <UpdateCustomerModal
        showEditCustomer={showEditCustomer}
        setShow1={setShow1}
        hiddenEdit={hiddenEdit}
        formData={formData}
        handleInputChange={handleInputChange}
        setSuccessMessage={setSuccessMessage}
        setData={setData}
        setCustomerIds={setCustomerIds}
        errorInput={errorInput}
        setErrorInput={setErrorInput}
      />

      {/* form are you sure */}
      <AYSCustomerModal
        showAYS={showAYS}
        handleAYS={handleAYS}
        deleteData={deleteData}
        formData={formData}
      />

      {/* form contend */}
      <div class="content_customer">
          <table>
            <thead>
              <tr class="QH">
                <td>Mã khách hàng</td>
                <td>Tên khách hàng</td>
                <td>Địa chỉ</td>
                <td>Số điện thoại</td>
                <td>Thao Tác</td>
              </tr>
              {Data.map((item, index) => (
                <tr key={index}>
                  <td>{item.ma_kh}</td>
                  <td>{item.ten_kh}</td>
                  <td>{item.dia_chi_kh}</td>
                  <td>{item.sdt_kh}</td>
                  <td>
                    <FaEdit onClick={() => handleEdit(item)}></FaEdit>
                    <FaTrash onClick={() => handleAYS(item.ma_kh)}></FaTrash>
                  </td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </div>
  );
};
export default Customer;
