import React, { useState, useEffect } from "react";
import "../style/Customer.css";
import "../style/Provider.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import AddProviderModal from "../components/Provider/AddProviderModal";
import UpdateProviderModal from "../components/Provider/UpdateProviderModal";
import SearchProviderModal from "../components/Provider/SearchProviderModal";
import AYSProviderModal from "../components/Provider/AYSProviderModal";

const Provider = () => {
  const [Data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAdd, setShow] = useState(false);
  const [showAYS, setAYS] = useState(false);
  const [search, setSearch] = useState({ MNCC: "" });
  const [providerIds, setProviderIds] = useState([]);
  const [formData, setform] = useState({
    MNCC: " ",
    TNCC: "",
    DC: " ",
    Email: " ",
    SDT: " ",
  });
  const [showEditCustomer, setShow1] = useState(false);
  const [errorInput,setErrorInput] = useState([false],[false],[false],[false])
  //Lấy dữ liệu từ sever
  const fetchProviders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/providers");
      setData(response.data.filter((item) => item.trang_thai == 1));
      // Cập nhật state customerIDs với dữ liệu trả về
      setProviderIds(response.data.map((item) => item.ma_ncc));
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu");
      setData();
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  //Tự tạo Mã nhà cung cấp
  const generateNewCustomerId = () => {
    if (providerIds.length === 0) return 1; // Nếu chưa có ID, bắt đầu từ KH1
    const lastId = providerIds[providerIds.length - 1]; // Lấy ID cuối cùng
    return `${lastId + 1}`; // Tăng giá trị số và thêm tiền tố
  };

  const handleAYS = (MNCC) => {
    setAYS(!showAYS);
    setform({
      MNCC: MNCC,
      TNCC: "",
      DC: "",
      Email: "",
      SDT: "",
    });
  };

  const hiddenAdd = () => {
    setShow(!showAdd);
    setform({
      MNCC: generateNewCustomerId(),
      TNCC: "",
      DC: "",
      Email: "",
      SDT: "",
    });
    setErrorInput((prevErrors) => {
      const newErrors = prevErrors.map(() => false);
      return newErrors;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setform((preform) => ({ ...preform, [name]: value }));
  };

  const hiddenEdit = (item) => {
    setShow1(!showEditCustomer);
    setform({
      MNCC: item.ma_ncc,
      TNCC: item.ten_ncc,
      DC: item.dia_chi,
      Email: item.email_ncc,
      SDT: item.sdt_ncc,
    });
    setErrorInput((prevErrors) => {
      const newErrors = prevErrors.map(() => false);
      return newErrors;
    });
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
        <h1>Quản Lý Nhà Cung Cấp</h1>
      </div>
      <div class="operation">
      {/* form search */}
        <SearchProviderModal
          setSearch={setSearch}
          search={search}
          setData={setData}
        />

        <div
          class="button-addCustomer"
        >
          <button onClick={hiddenAdd}>Thêm</button>
        </div>
      </div>


      <AddProviderModal
        setData={setData}
        setProviderIds={setProviderIds}
        formData={formData}
        setSuccessMessage={setSuccessMessage}
        hiddenAdd={hiddenAdd}
        showAdd={showAdd}
        handleInputChange={handleInputChange}
        fetchProviders={fetchProviders}
        errorInput={errorInput}
        setErrorInput={setErrorInput}
      />

      <UpdateProviderModal
        formData={formData}
        setSuccessMessage={setSuccessMessage}
        hiddenEdit={hiddenEdit}
        fetchProviders={fetchProviders}
        showEditCustomer={showEditCustomer}
        handleInputChange={handleInputChange}
        errorInput={errorInput}
        setErrorInput={setErrorInput}
      />

      <AYSProviderModal
        showAYS={showAYS}
        handleAYS={handleAYS}
        formData={formData}
        setform={setform}
        setSuccessMessage={setSuccessMessage}
        fetchProviders={fetchProviders}
      />

      <div class="content_provider">
        {/* Danh sách NCC  */}
          <table>
            <thead>
              <tr className="rows_QH">
                <td>Mã Nhà Cung Cấp</td>
                <td>Tên Nhà Cung Cấp</td>
                <td>Địa chỉ</td>
                <td>Email</td>
                <td>Số điện thoại</td>
                <td>Thao Tác</td>
              </tr>
            </thead>
            {Data.map((item, index) => (
              <tr key={index}>
                <td>{item.ma_ncc}</td>
                <td>{item.ten_ncc}</td>
                <td>{item.dia_chi}</td>
                <td>{item.email_ncc}</td>
                <td>{item.sdt_ncc}</td>
                <td>
                  <FaEdit onClick={() => hiddenEdit(item)}></FaEdit>{" "}
                  <FaTrash onClick={() => handleAYS(item.ma_ncc)}></FaTrash>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
  );
};
export default Provider;
