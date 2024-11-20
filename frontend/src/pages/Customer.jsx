import React, { useState, useEffect } from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Customer = () => {
  const [Data, setData] = useState([]);
  const [showAddCustomer, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditCustomer, setShow1] = useState(false);
  const [showError, setError]=useState(false);
  const [formData, setform] = useState({
    MKH: "",
    TKH: "",
    DC: "",
    SDT: "",
  });
  const [search, setSearch] = useState({
    Name: "",
  });
  const fetchCustomers = async () => {
    try {
      // Gửi yêu cầu GET đến API để lấy danh sách khách hàng
      const response = await axios.get("http://localhost:5000/api/customers");

      // Cập nhật state customers với dữ liệu trả về
      setData(response.data);
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

  const addData = async () => {
    const payload = {
      ma_kh: formData.MKH,
      ten_kh: formData.TKH,
      dia_chi_kh: formData.DC,
      sdt_kh: formData.SDT,
    };
    // console.log(payload);
    
    if(!formData.TKH){
      setError("nhap mã Khách hàng")

    }

    setTimeout(() => {
      setError(""); // Ẩn thông báo
    }, 4000);

    // try {
    //   await axios.post("http://localhost:5000/api/customers", payload);

    //   setSuccessMessage("Khách hàng đã được thêm thành công!");
    //   setTimeout(() => {
    //     setSuccessMessage(""); // Ẩn thông báo
    //   }, 2000);
    //   // Cập nhật lại danh sách khách hàng
    //   fetchCustomers();
    //   hiddenAdd();
    // } catch (error) {
    //   console.error("lỗi");
    //   setTimeout(() => {
    //     setSuccessMessage("Lỗi thêm khách hàng"); // Ẩn thông báo
    //   }, 2000);
    // }
  };

  const hiddenAdd = () => {
    setShow(!showAddCustomer);
    setform({
      MKH: "",
      TKH: "",
      DC: "",
      SDT: "",
    });
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setform({
      ...formData,
      [name]: value,
    });
  };

  const updateData = async () => {
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
  };

  const deleteData = async (MKH) => {
    setSuccessMessage("Xóa thành công!");
    await axios.delete(`http://localhost:5000/api/customers/${MKH}`);
    fetchCustomers();
    setTimeout(() => {
      setSuccessMessage(""); // Ẩn thông báo
    }, 2000);
  };

  const searchData = async (e) => {
    const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    });
    const response = (await axios.get(`http://localhost:5000/api/customers`))
      .data;

    if (value) {
      if (isNaN(value)) {
        const KH_search = response.filter((response) =>
          response.ten_kh.toLowerCase().includes(value.toLowerCase())
        );
        console.log(KH_search);
        setData(KH_search);
      } else {
        const KH_search = response.filter((response) =>
          response.ma_kh.toString().includes(value.toString())
        );
        setData(KH_search);
      }
    } else {
      const response = await axios.get(`http://localhost:5000/api/customers`);
      setData(response.data);
    }
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
        <div class="input-search">
          <input
            onChange={searchData}
            name="MKH"
            type="text"
            value={search.MKH}
            placeholder="Search......"
          ></input>
        </div>

        <div class="button-addCustomer">
          <button onClick={hiddenAdd}>Thêm</button>
        </div>
      </div>

      <div
        class="interface_add"
        style={{ display: showAddCustomer ? "block" : "none" }}
      >
        
        <div>

        <div class="overlay " onClick={hiddenAdd}></div>
        {/* Thông báo thêm thành công với animation */}
        {showError && (
          <div className="error-message">{showError}</div>
        )}
      </div>
        <div class="form_interface">
          <form class="form_interface_add">
            <div>
              <h1> Thêm Khách Hàng</h1>
              <div class="interface_add-content">
                <input
                  placeholder="Nhập Mã Khách Hàng"
                  name="MKH"
                  type="number"
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

      <div
        class="interface_edit"
        style={{ display: showEditCustomer ? "block" : "none" }}
      >
        <div class="overlay " onClick={() => hiddenEdit()}></div>
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
                <FaEdit onClick={() => handleEdit(item)}></FaEdit>{" "}
                <FaTrash onClick={() => deleteData(item.ma_kh)}></FaTrash>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default Customer;
