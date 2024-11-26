import React, { useState, useEffect } from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const Provider = () => {
  const [Data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showError, setError] = useState("");
  const [showAdd, setShow] = useState(false);
  const [showAYS,setAYS] =useState(false);
  const [search,setSearch] = useState({MNCC:""})
  const [providerIds,setProviderIds] =useState ([])
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
      setData(response.data.filter((item)=> item.trang_thai == 1));
       // Cập nhật state customerIDs với dữ liệu trả về
       setProviderIds(response.data.map((item)=>item.ma_ncc))
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

//cập nhật Nhà cung cấp
  const updateProvider = async() =>{
    if(!formData.TNCC||!formData.DC||!formData.Email||!formData.SDT){
      setError("Vui lòng nhập thông tin!");
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
        if(!validatePhoneNumber(formData.SDT)){
          setError("Vui lòng nhập đúng SDT!");
          setTimeout(() => {
          setError(""); // Ẩn thông báo
          }, 2000);
        }else{
          const payload ={
            ten_ncc : formData.TNCC,
            dia_chi : formData.DC,
            email_ncc : formData.Email,
            sdt_ncc : formData.SDT
          }
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
  }

  //Xóa nhà cung cấp
  const deleteProvider = async(MNCC)=>{
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
    console.log(formData)
  }

//tìm kiếm nhà cung cấp
const searchProvider = async(e) =>{
  const { name, value } = e.target;
    setSearch({
      ...search,
      [name]: value,
    })
    const response = (await axios.get(`http://localhost:5000/api/providers`))
      .data;

      if (value) {
        if (isNaN(value)) {
          const NCC_search = response.filter((response) =>
            response.ten_ncc.toLowerCase().includes(value.toLowerCase())
          );
          setData(NCC_search);
        } else {
          const NCC_search = response.filter((response) =>
            response.ma_ncc.toString().includes(value.toString())
          );
          setData(NCC_search);
        }
      } else {
        const response = await axios.get(`http://localhost:5000/api/providers`);
        setData(response.data);
      }

}
//Tự tạo Mã nhà cung cấp
const generateNewCustomerId = () => {
  if (providerIds.length === 0) return 1; // Nếu chưa có ID, bắt đầu từ KH1
  const lastId = providerIds[providerIds.length - 1]; // Lấy ID cuối cùng
  return `${lastId + 1}`; // Tăng giá trị số và thêm tiền tố
};


const handleAYS = (MNCC) =>{
  setAYS(!showAYS);
  setform({
    MNCC: MNCC,
    TNCC: "",
    DC: "",
    Email:"",
    SDT: ""
  });
}

  const hiddenAdd = () => {
    setShow(!showAdd);
    setform({ MNCC: generateNewCustomerId(), TNCC: "", DC: "", Email: "", SDT: "" });
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
        <div class="input-search">
          <input onChange={searchProvider} placeholder="Search......"></input>
        </div>

        <div class="button-addCustomer">
          <button onClick={hiddenAdd}>Thêm</button>
        </div>
      </div>

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
                <button type="button" onClick={updateProvider}>Sửa</button>
              </div>
            </div>
          </form>
        </div>
      </div>

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
            <button type="button" onClick={() => deleteProvider(formData.MNCC)}>Yes</button>
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
