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
    setRoleID((prev) => ({ ...prev, ma_quyen: ma_quyen }));
    setMaNvID(ma_nv);
    setNameRoleChange(ma_quyen); // neu state la kieu chuoi khi set kieu so thi sau cung no van la chuoi
  };

  const handleRoleChange = (e) => {
    setRoleID((prev) => ({ ...prev, ma_quyen: parseInt(e.target.value) }));
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
    if (roleID.ma_quyen === null || !roleID.ma_quyen) {
      alert("chon vai tro khong duoc de trong");
      return;
    }
    try {
      console.log(roleID.ma_quyen);
      const response = await permissionService.updateRole(maNvID, roleID);
      console.log("updated role succcessfull", response);
      alert("Update successfull");
      window.location.reload();
    } catch (error) {
      console.log("error updating role: ", error);
    }
  };

  const handleDeleteUserAccount = async (ma_nv, ma_quyen) => {
    console.log(ma_nv);
    if (ma_quyen === null) {
      return;
    }
    const confirmDelete = window.confirm(
      "ban co chac chan xoa vai tro cua nguoi dung nay khong?"
    );
    if (!confirmDelete) return;
    try {
      const response = await permissionService.deleteRole(ma_nv);
      console.log("delete successfull", response);
      alert("deleted", response);
      window.location.reload();
    } catch (error) {
      console.log("error deleting user account: ", error);
    }
  };

  const [showFeature, setShowFeature] = useState(false);
  const handleShowFeature = () => {
    setShowFeature(!showFeature);
  };

  const [dataFeature, setDataFeature] = useState([]);
  useEffect(() => {
    const fetchDataFeature = async () => {
      const data = await permissionService.showAllFeature();
      setDataFeature(data);
      console.log(data);
    };
    fetchDataFeature();
  }, []);

  return (
    <div>
      <div class="permission-container-account">
        <h1>Quản Lí Người Dùng</h1>
        <div class="permission-container-account_content">
          <table>
            <tr>
              <td>Tên Tài Khoản</td>
              <td>Email</td>
              <td>Vai Trò</td>
              <td>Thao Tác</td>
            </tr>
            {dataShow.length > 0 ? (
              dataShow.map((item) => (
                <tr>
                  <td>{item.ten_nv}</td>
                  <td>{item.email}</td>
                  <td>{item.ten_quyen ? item.ten_quyen : "No Permission"}</td>
                  <td>
                    <FaEdit
                      className="edit-btn"
                      onClick={() =>
                        handleShowEditUserAccount(
                          item.ma_nv,
                          item.ten_nv,
                          item.email,
                          item.ma_quyen
                        )
                      }
                    />
                    <FaTrash
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteUserAccount(item.ma_nv, item.ma_quyen)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Data</td>
              </tr>
            )}
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
        className="permission-edit-user-account"
        style={{ display: showEditUserAccount ? "block" : "none" }}
      >
        <div className="wrapper-content">
          <h1>Sửa Vai Trò Người Dùng</h1>
          <div className="permission-edit-user-account_content">
            <div className="permission-edit-user-account_content__content-items">
              <label htmlFor="">Tên Tài Khoản:</label>
              <input
                type="text"
                placeholder="Nhập tên tài khoản"
                value={name.ten_nv}
                readOnly
              />
            </div>
            <div className="permission-edit-user-account_content__content-items">
              <label htmlFor="">Email:</label>
              <input
                type="text"
                placeholder="Nhập email"
                value={name.email}
                readOnly
              />
            </div>
            <div className="permission-edit-user-account_content__content-items">
              <label htmlFor="">Chọn vai trò:</label>
              <select value={nameRoleChange} onChange={handleRoleChange}>
                <option></option>
                <option value="1">Admin</option>
                <option value="2">Quản lý</option>
                <option value="3">Nhân viên kho</option>
                <option value="4">Nhân viên kiểm toán</option>
              </select>
              {console.log("check before:", nameRoleChange)}
              {console.log("check before:", roleID.ma_quyen)}
            </div>
            <div className="permission-edit-user-account_button">
              <button onClick={() => handleChangeRole(maNvID, roleID)}>
                Lưu
              </button>
              <button onClick={handleShowEditUserAccount}>Thoát</button>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper-btn">
        <button className="show-feature-btn" onClick={handleShowFeature}>
          Thay Đổi Chức Năng Quyền
        </button>
      </div>

      <div
        className="feature-permission"
        style={{ display: showFeature ? "block" : "none" }}
      >
        <div className="feature-permission_content">
          <table>
            <tr>
              <td>Vai Trò</td>
              <td>Chức Năng</td>
              <td>Lựa Chọn</td>
            </tr>
            <tr>
              <td>
                <select>
                  <option value="">---Chọn quyền---</option>
                  <option value="Admin">Admin</option>
                  <option value="Quản lý">Quản lý</option>
                  <option value="Nhân viên kho">Nhân viên kho</option>
                  <option value="Nhân viên kiểm toán">
                    Nhân viên kiểm toán
                  </option>
                </select>
              </td>
              <td>Chức Năng</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            {dataFeature.map((item)=>(
              <tr>
                <td></td>
                <td>{item.ten_quyen}</td>
                <td></td>
              </tr>
            ))}
          </table>
          <div className="save-show-feature">
            <button>Lưu</button>
            <button onClick={handleShowFeature}>Thoát</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PermissionAccount;
