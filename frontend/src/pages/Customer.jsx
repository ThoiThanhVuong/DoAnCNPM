import React, { useState, useEffect } from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const Customer = () => {
  const [Data, setData] = useState([]);
  const [showAddCustomer, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditCustomer, setShow1] = useState(false);
  const [showError, setError] = useState("");
  const [showAYS,setAYS] =useState(false);
  const [customerIds,setCustomerIds] =useState ([])
  const [formData, setform] = useState({
    MKH: "",
    TKH: "",
    DC: "",
    SDT: "",
  });
  const [search, setSearch] = useState({
    MKH: "",
  });
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
    console.log(validatePhoneNumber(formData.SDT))
    if (!formData.TKH || !formData.TKH || !formData.DC || !formData.SDT) {
      setError("vui long nhap thong tin!");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      if(!validatePhoneNumber(formData.SDT)){
        setError("vui long nhap dung SDT");
      setTimeout(() => {
        setError("");
      }, 2000);
      }else{
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

  const hiddenAdd = () => {
    setShow(!showAddCustomer);
    setform({
      MKH: generateNewCustomerId(),
      TKH: "",
      DC: "",
      SDT: "",
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setform({
      ...formData,
      [name]: value,
    });
  };

  const updateData = async () => {

    if(!formData.TKH||!formData.DC||!formData.SDT){
      setError("vui long nhap thong tin!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }else{
      if(!validatePhoneNumber(formData.SDT)){
        setError("vui long nhap dung SDT!");
        setTimeout(() => {
          setError("");
        }, 2000);
      }else{

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

        setSearch({MKH:""})
        setTimeout(() => {
          setSuccessMessage(""); // Ẩn thông báo
        }, 2000);
      };
      }
    }

  const deleteData = async (MKH) => {
    setSuccessMessage("Xóa thành công!");
    await axios.delete(`http://localhost:5000/api/customers/${MKH}`);
    fetchCustomers();
    setform({
      MKH: "",
      TKH: "",
      DC: "",
      SDT: "",
    });
    setAYS(!showAYS);
    setSearch({MKH:""})
    setTimeout(() => {
      setSuccessMessage(""); // Ẩn thông báo
    }, 2000);
  };

  const handleAYS = (MKH) =>{
    setAYS(!showAYS);
    setform({
      MKH: MKH,
      TKH: "",
      DC: "",
      SDT: "",
    });
  }

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
        {/* form Thêm */}
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
        {/* form Sửa */}
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
        {/* form are you sure */}
        <div
        class="interface_ays"
        style={{ display: showAYS ? "block" : "none" }}
      >
        <div class="overlay " onClick={() => handleAYS("")}></div>
        <div class="form_interface">
          <form class="form_interface_ays">
            <h1>Are You Sure</h1>
            
            <div class="button-addCustomer-interface">
            <button type="button" onClick={() => handleAYS("")}>No</button>
            <button type="button" onClick={() => deleteData(formData.MKH)}>Yes</button>
            </div>
          </form>
        </div>
      </div>
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
                <FaEdit onClick={() => handleEdit(item)}></FaEdit>{" "}
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
