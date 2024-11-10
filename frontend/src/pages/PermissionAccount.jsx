import React, { useEffect, useState } from "react";
import "../style/PermissionAccount.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import permissionService from "../services/permissionService";
const PermissionAccount = () => {
  // const [showAddUserAccount, setShow] = useState(false);

  // const handleShowAddUserAccount = () => {
  //   setShow(!showAddUserAccount);
  // };

  const [showEditUserAccount, setShow2] = useState(false);
  const [name, setName] = useState({ ten_nv: "", email: "" });
  const [roleID, setRoleID] = useState({ ma_quyen: 0 });
  const [maNvID, setMaNvID] = useState("");
  const [nameRoleChange, setNameRoleChange] = useState("");
  const handleShowEditUserAccount = (ma_nv, ten_nv, email, ma_quyen) => {
    setShow2(!showEditUserAccount);
    setName({ ten_nv: ten_nv, email: email });
    setRoleID({ ...roleID, ma_quyen: ma_quyen });
    setMaNvID(ma_nv);
    setNameRoleChange(ma_quyen); // neu state la kieu chuoi khi set kieu so thi sau cung no van la chuoi
  };

  const handleRoleChange = (e) => {
    setRoleID({ ...roleID, ma_quyen: parseInt(e.target.value) });
    setNameRoleChange(e.target.value);
  };
  // kiem tra xem roleID co cap nhat sau khi thay doi option o the select khong
  // useEffect(() => {
  //   console.log("check role after change: ", roleID);
  // }, [roleID]);

  const [dataShow, setDataShow] = useState([]);
  useEffect(() => {
    const fetchPermission = async () => {
      const data = await permissionService.showAllPermission();
      console.log(data);
      setDataShow(data);
    };
    fetchPermission();
  }, []);

  const handleChangeRole = async (maNvID, roleID) => {
    console.log(roleID);
    try {
      const response = await permissionService.updateRole(maNvID, roleID);
      console.log("updated role succcessfull", response);
      alert("Update successfull")
      window.location.reload()
    } catch (error) {
      console.log("error updating role: ", error);
    }
  };

  return (
    <div>
      <div class="container-account">
        <h1>Quản Lí Người Dùng</h1>
        <div class="container-account_content">
          <table>
            <tr>
              <td>Tên Tài Khoản</td>
              <td>Email</td>
              <td>Vai Trò</td>
              <td>Thao Tác</td>
            </tr>
            {dataShow.map((item) => (
              <tr>
                <td>{item.ten_nv}</td>
                <td>{item.email}</td>
                <td>{item.ten_quyen}</td>
                <td>
                  <FaEdit
                    className="edit"
                    onClick={() =>
                      handleShowEditUserAccount(
                        item.ma_nv,
                        item.ten_nv,
                        item.email,
                        item.ma_quyen
                      )
                    }
                  />
                  <FaTrash className="delete" />
                </td>
              </tr>
            ))}
          </table>
          {/* <div class="container-account_button">
            <button onClick={handleShowAddUserAccount}>Thêm</button>
          </div> */}
        </div>
      </div>

      {/* <div
        className="add-user-account"
        style={{ display: showAddUserAccount ? "block" : "none" }}
      >
        <h1>Thêm Người Dùng</h1>
        <div className="add-user-account_content">
          <div className="add-user-account_content__content-items">
            <label htmlFor="">Tên Tài Khoản:</label>
            <input type="text" placeholder="Nhập tên tài khoản" />
          </div>
          <div className="add-user-account_content__content-items">
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Nhập email" />
          </div>
          <div className="add-user-account_content__content-items">
            <label htmlFor="">Chọn vai trò:</label>
            <select name="ten_quyen">
              <option value="Admin">Admin</option>
              <option value="nhân viên quản lí kho">
                nhân viên quản lí kho
              </option>
              <option value="kế toán">kế toán</option>
            </select>
          </div>
          <div className="add-user-account_button">
            <button>Lưu</button>
            <button onClick={handleShowAddUserAccount}>Thoát</button>
          </div>
        </div>
      </div> */}

      <div
        className="edit-user-account"
        style={{ display: showEditUserAccount ? "block" : "none" }}
      >
        <h1>Sửa Vai Trò Người Dùng</h1>
        <div className="edit-user-account_content">
          <div className="edit-user-account_content__content-items">
            <label htmlFor="">Tên Tài Khoản:</label>
            <input
              type="text"
              placeholder="Nhập tên tài khoản"
              value={name.ten_nv}
              readOnly
            />
          </div>
          <div className="edit-user-account_content__content-items">
            <label htmlFor="">Email:</label>
            <input
              type="text"
              placeholder="Nhập email"
              value={name.email}
              readOnly
            />
          </div>
          <div className="edit-user-account_content__content-items">
            <label htmlFor="">Chọn vai trò:</label>
            <select value={nameRoleChange} onChange={handleRoleChange}>
              <option value="1">Admin</option>
              <option value="2">Quản lý</option>
              <option value="3">Nhân viên kho</option>
              <option value="4">Nhân viên kiểm toán</option>
            </select>
            {/* {console.log("check before:", nameRoleChange)} */}
          </div>
          <div className="edit-user-account_button">
            <button onClick={() => handleChangeRole(maNvID, roleID)}>
              Lưu
            </button>
            <button onClick={handleShowEditUserAccount}>Thoát</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PermissionAccount;
