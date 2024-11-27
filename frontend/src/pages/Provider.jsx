import React, { useState, useEffect } from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import AddProviderModal from "../components/Provider/AddProviderModal";
import UpdateProviderModal from "../components/Provider/UpdateProviderModal";
import SearchProviderModal from "../components/Provider/SearchProviderModal";

const Provider = () => {
  const [Data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setError] = useState("");
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

  //Thêm Nhà Cung Cấp
  const addProvider = async () => {
    if (
      !formData.MNCC ||
      !formData.TNCC ||
      !formData.DC ||
      !formData.Email ||
      !formData.SDT
    ) {
      setError("Vui lòng nhập thông tin!");
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
        if (!validateEmail(formData.Email)) {
          setError("Vui lòng nhập đúng Email!");
          setTimeout(() => {
            setError(""); // Ẩn thông báo
          }, 2000);
        } else {
          try {
            const payload = {
              ma_ncc: formData.MNCC,
              ten_ncc: formData.TNCC,
              dia_chi: formData.DC,
              email_ncc: formData.Email,
              sdt_ncc: formData.SDT,
            };
            await axios.post("http://localhost:5000/api/providers", payload);
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

  //Xóa nhà cung cấp
  const deleteProvider = async (MNCC) => {
    await axios.delete(`http://localhost:5000/api/providers/${MNCC}`);
    setform({
      MKH: "",
      TKH: "",
      DC: "",
      SDT: "",
    });
    setSuccessMessage("Xóa thành công");
    setTimeout(() => {
      setSuccessMessage(""); // Ẩn thông báo
    }, 1500);
    fetchProviders();
    handleAYS("");
    console.log(formData);
  };


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
        
        <SearchProviderModal setSearch={setSearch} search={search} setData={setData} />

        <div class="button-addCustomer">
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
      />

      <UpdateProviderModal
        formData={formData}
        setSuccessMessage={setSuccessMessage}
        hiddenEdit={hiddenEdit}
        fetchProviders={fetchProviders}
        showEditCustomer={showEditCustomer}
        handleInputChange={handleInputChange}
      />

      <div
        class="interface_ays"
        style={{ display: showAYS ? "block" : "none" }}
      >
        <div class="overlay " onClick={() => handleAYS("")}></div>
        <div class="form_interface">
          <form class="form_interface_ays">
            <h1>Are You Sure</h1>

            <div class="button-addCustomer-interface">
              <button type="button" onClick={() => handleAYS("")}>
                No
              </button>
              <button
                type="button"
                onClick={() => deleteProvider(formData.MNCC)}
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="content_customer">
        <table>
          <thead>
            <tr className="QH">
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
