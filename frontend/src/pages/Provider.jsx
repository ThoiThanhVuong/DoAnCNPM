import React,{ useState }  from "react";
import "../style/Customer.css";
import { FaEdit, FaTrash } from "react-icons/fa";
const Provider = () => {
    const [Data,setData] = useState([
        {
            MNCC: 1,
            TNCC: "Nguyen Van A",
            DC: "Tp HO CHI MINH",
            Email:"NCC1@gmail.com",
            SDT: "0394163661",
        },
        {
            MNCC: 2,
            TNCC: "Nguyen Van B",
            DC: "HN",
            Email:"NCC2@gmail.com",
            SDT: "0123456789",
        },
        {
            MNCC: 3,
            TNCC: "Nguyen Van C",
            DC: "Tay Ninh",
            Email:"NCC3@gmail.com",
            SDT: "0987456123",
        },
        {
            MNCC: 4,
            TNCC: "Nguyen Van C",
            DC: "Tay Ninh",
            Email:"NCC4@gmail.com",
            SDT: "0987456123",
        },
        {
            MNCC: 5,
            TNCC: "Nguyen Van C",
            DC: "Tay Ninh",
            Email:"NCC5@gmail.com",
            SDT: "0987456123",
        },
    ]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showAddCustomer, setShow] = useState(false);
    const [formData,setform]=useState({MKH:" ",TKH:" ",DC:" ",Email:" ",SDT:" "});
    const [showEditCustomer, setShow1] = useState(false);

    const hiddenAdd = () => {
        setShow(!showAddCustomer);
        setform({MKH:"",TKH:"",DC:"",Email:"",SDT:""})
      };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setform((preform) => ({ ...preform, [name]: value }));
    };

    const hiddenEdit = (item) => {
        setShow1(!showEditCustomer);
        setform({MKH:item.MKH,TKH:item.TNCC,DC:item.DC,Email:item.Email,SDT:item.SDT});
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
                <input placeholder="Nhập Mã Nhà Cung Cập" name="MKH" type="number" value={formData.MKH} onChange={handleInputChange}></input>
                <input placeholder="Nhập Tên Nhà Cung Cập" name="TKH" type="text" value={formData.TKH}  onChange={handleInputChange}></input>
                <input placeholder="nhập Địa chỉ" name="DC" type="text" value={formData.DC} onChange={handleInputChange}></input>
                <input placeholder="Nhập Email" name="Email" type="text" value={formData.Email} onChange={handleInputChange}></input>
                <input placeholder="Nhập Số điện thoại" name="SDT" type="text" value={formData.SDT} onChange={handleInputChange}></input>
              </div>
              <div class="button-addCustomer-interface">
                <button type="button" onClick={hiddenAdd}>Thoát</button>
                <button type="button" >Thêm</button>
              </div>
            </div>
          </form>
        </div>
      </div>


      <div class="interface_edit" style={{ display: showEditCustomer ? "block" : "none" }}>
      <div class="overlay " onClick={() => hiddenEdit(" ")}></div>
        <div class="form_interface">
          <form class="form_interface_add">
            <div>
              <h1>Sửa Khách Hàng</h1>
            
              <div  class="interface_add-content">
                <input placeholder="Nhập Tên Nhà Cung Cấp" name="TNCC" type="text" value={formData.TKH} onChange={handleInputChange}></input>
                <input placeholder="nhập Địa chỉ" name="DC" type="text" value={formData.DC} onChange={handleInputChange}></input>
                <input placeholder="nhập Email" name="Email" type="text" value={formData.Email} onChange={handleInputChange}></input>
                <input placeholder="Nhập Số điện thoại" name="SDT" type="text" value={formData.SDT} onChange={handleInputChange}></input>
              </div>
              
              <div class="button-addCustomer-interface">
                <button type="button" onClick={() => hiddenEdit(" ")}>Thoát</button>
                <button type="button" >Sửa</button>
              </div>
            </div>
          </form>
        </div>
      </div>


      <div class="content_customer">
        <table>
          <tr>
            <td>Mã Nhà Cung Cấp</td>
            <td>Tên Nhà Cung Cấp</td>
            <td>Địa chỉ</td>
            <td>Email</td>
            <td>Số điện thoại</td>
            <td>Thao Tác</td>
          </tr>
          {Data.map((item, index) => (
            <tr key={index}>
              <td>{item.MNCC}</td>
              <td>{item.TNCC}</td>
              <td>{item.DC}</td>
              <td>{item.Email}</td>
              <td>{item.SDT}</td>
              <td>
                <FaEdit onClick={() => hiddenEdit(item)} ></FaEdit>{" "}
                <FaTrash ></FaTrash>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default Provider;