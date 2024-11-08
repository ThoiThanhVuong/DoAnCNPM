import React, { useState } from "react";
import "../style/PermissionAccount.css";
import { FaEdit, FaTrash } from "react-icons/fa";
const PermissionAccount = () => {
  const [showAddUserAccount, setShow] = useState(false);

  const handleShowAddUserAccount = () => {
    setShow(!showAddUserAccount);
  };

  const [showEditUserAccount, setShow2] = useState(false);

  const handleShowEditUserAccount = () => {
    setShow2(!showEditUserAccount);
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
            <tr>
              <td>user1</td>
              <td>user1@gmail.com</td>
              <td>admin</td>
              <td>
                <FaEdit className="edit" onClick={handleShowEditUserAccount} />
                <FaTrash className="delete" />
              </td>
            </tr>
            <tr>
              <td>user2</td>
              <td>user2@gmail.com</td>
              <td>nhân viên quản lí kho</td>
              <td>
                <FaEdit className="edit" onClick={handleShowEditUserAccount} />
                <FaTrash className="delete" />
              </td>
            </tr>
            <tr>
              <td>user3</td>
              <td>user3@gmail.com</td>
              <td>kế toán</td>
              <td>
                <FaEdit className="edit" onClick={handleShowEditUserAccount} />
                <FaTrash className="delete" />
              </td>
            </tr>
            <tr>
              <td>user4</td>
              <td>user4@gmail.com</td>
              <td>kế toán</td>
              <td>
                <FaEdit className="edit" onClick={handleShowEditUserAccount} />
                <FaTrash className="delete" />
              </td>
            </tr>
            <tr>
              <td>user5</td>
              <td>user5@gmail.com</td>
              <td>nhân viên quản lí kho</td>
              <td>
                <FaEdit className="edit" onClick={handleShowEditUserAccount} />
                <FaTrash className="delete" />
              </td>
            </tr>
          </table>
          <div class="container-account_button">
            <button onClick={handleShowAddUserAccount}>Thêm</button>
          </div>
        </div>
      </div>

      <div
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
      </div>

      <div
        className="edit-user-account"
        style={{ display: showEditUserAccount ? "block" : "none" }}
      >
        <h1>Sửa Thông Tin Người Dùng</h1>
        <div className="edit-user-account_content">
          <div className="edit-user-account_content__content-items">
            <label htmlFor="">Tên Tài Khoản:</label>
            <input type="text" placeholder="Nhập tên tài khoản" />
          </div>
          <div className="edit-user-account_content__content-items">
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Nhập email" />
          </div>
          <div className="edit-user-account_content__content-items">
            <label htmlFor="">Chọn vai trò:</label>
            <select name="ten_quyen">
              <option value="Admin">Admin</option>
              <option value="nhân viên quản lí kho">
                nhân viên quản lí kho
              </option>
              <option value="kế toán">kế toán</option>
            </select>
          </div>
          <div className="edit-user-account_button">
            <button>Lưu</button>
            <button onClick={handleShowEditUserAccount}>Thoát</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PermissionAccount;
