import React, { useState, useEffect } from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const Customer = () => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddCustomer, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditCustomer, setShow1] = useState(false);
  const [formData, setform] = useState({
    ma_kh: " ",
    ten_kh: " ",
    dia_chi_kh: " ",
    sdt_kh: " ",
  });
  const [customerData, setCustomerData] = useState({
    MKH: "",
    TKH: "",
    DC: "",
    SDT: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your axios operation:",
          error
        );
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const addData = async () => {
    try {
      const payload = {
        ma_kh: customerData.MKH,
        ten_kh: customerData.TKH,
        dia_chi_kh: customerData.DC,
        sdt_kh: customerData.SDT,
      };
  
      console.log("Payload gửi lên:", payload);
  
      const response = await axios.post("http://localhost:5000/api/customers", payload);
  
      setSuccessMessage("Khách hàng đã được thêm thành công!");
      console.log("Thêm khách hàng thành công:", response.data);
  
      // Cập nhật lại danh sách khách hàng
      setData((prevData) => [...prevData, response.data]);
  
      // Reset form
      setCustomerData({ MKH: "", TKH: "", DC: "", SDT: "" });
      hiddenAdd();
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error);
      setSuccessMessage("Đã xảy ra lỗi khi thêm khách hàng.");
    } finally {
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };
  
  

  const hiddenAdd = () => {
    setShow(!showAddCustomer);
    setform({ ma_kh: " ", ten_kh: " ", dia_chi_kh: " ", sdt_kh: " " });
  };

  const hiddenEdit = (item) => {
    setShow1(!showEditCustomer);
    setform({
      MKH: item.ma_kh,
      TKH: item.ten_kh,
      DC: item.dia_chi_kh,
      SDT: item.sdt_kh,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };
  

  const updateData = (e) => {
    e.preventDefault();
    setData(Data.map((item) => (item.MKH === formData.MKH ? formData : item)));
    setShow1(!showEditCustomer);
    setSuccessMessage("Sửa thành công!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  // const addData=(e)=>{
  //   e.preventDefault();
  //   setData((prevData) => [...prevData, formData]);
  //   setform({MKH:"",TKH:"",DC:"",SDT:""})
  //   setSuccessMessage("Thêm thành công!");
  //   setShow(!showAddCustomer);
  //   setTimeout(() => setSuccessMessage(''), 2000);
  // };

  const deleteData = (mkh) => {
    setData((prevData) => prevData.filter((item) => item.ma_kh !== mkh));
    setSuccessMessage("Xóa thành công!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <div class="page_customer">
      <div>
        {/* Thông báo thêm thành công với animation */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
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
                <input
                  placeholder="Nhập Mã Khách Hàng"
                  name="MKH"
                  type="number"
                  value={customerData.MKH}
                  onChange={handleInputChange}
                ></input>
                <input
                  placeholder="Nhập Tên"
                  name="TKH"
                  type="text"
                  value={customerData.TKH}
                  onChange={handleInputChange}
                ></input>
                <input
                  placeholder="nhập Địa chỉ"
                  name="DC"
                  type="text"
                  value={customerData.DC}
                  onChange={handleInputChange}
                ></input>
                <input
                  placeholder="Nhập Số điện thoại"
                  name="SDT"
                  type="text"
                  value={customerData.SDT}
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

      <div
        class="interface_edit"
        style={{ display: showEditCustomer ? "block" : "none" }}
      >
        <div class="overlay " onClick={() => hiddenEdit(" ")}></div>
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
                <button type="button" onClick={() => hiddenEdit(" ")}>
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
              <td>{item.ma_kh}</td>
              <td>{item.ten_kh}</td>
              <td>{item.dia_chi_kh}</td>
              <td>{item.sdt_kh}</td>
              <td>
                <FaEdit onClick={() => hiddenEdit(item)}></FaEdit>{" "}
                <FaTrash onClick={() => deleteData(item.MKH)}></FaTrash>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default Customer;
