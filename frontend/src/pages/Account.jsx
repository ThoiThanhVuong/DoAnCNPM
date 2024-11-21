import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../style/Account.css";

const Account = () => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [data, setData] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [newAccountData, setNewAccountData] = useState({
    ma_nv: "",
    ten_nv: "",
    gioi_tinh: "",
    sdt: "",
    email: "",
    mat_khau: "",
    ma_quyen: "",
    trang_thai: 1, // Default active
  });

  const [editAccountData, setEditAccountData] = useState({
    ten_nv: "",
    gioi_tinh: "",
    sdt: "",
    email: "",
    mat_khau: "",
    ma_quyen: "",
    trang_thai: "",
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employee");
      const accounts = await response.json();
      setData(accounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  const generateEmployeeId = () => {
    const maxId = data.reduce((max, account) => {
      const match = account.ma_nv.match(/^nv(\d+)$/);
      if (match) {
        const id = parseInt(match[1], 10);
        return Math.max(max, id);
      }
      return max;
    }, 0);
    return `nv${maxId + 1}`;
  };

  const handleAddAccount = async () => {
    // Kiểm tra xem dữ liệu đã đủ chưa
    if (
      !newAccountData.ten_nv ||
      !newAccountData.email ||
      !newAccountData.mat_khau ||
      !newAccountData.sdt ||
      !newAccountData.gioi_tinh
    ) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
  
    try {
      const ma_nv = generateEmployeeId();
      const newAccountWithEmployeeId = { ...newAccountData, ma_nv };
  
      const response = await fetch("http://localhost:5000/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccountWithEmployeeId),
      });
  
      // Kiểm tra xem phản hồi từ API có thành công không
      if (!response.ok) throw new Error("Failed to add account");
  
      const newAccount = await response.json();
  
      // Cập nhật danh sách dữ liệu và đóng form thêm tài khoản
      setData((prevData) => [...prevData, newAccount]);
      setShowAddAccount(false);
  
      // Reset lại dữ liệu sau khi thêm tài khoản thành công
      setNewAccountData({
        ma_nv: "",
        ten_nv: "",
        gioi_tinh: "",
        sdt: "",
        email: "",
        mat_khau: "",
        ma_quyen: "",
        trang_thai: 1,
      });
  
      alert("Tạo tài khoản thành công!");
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleEditAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employee/${currentAccount.ma_nv}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editAccountData),
        }
      );
      if (!response.ok) throw new Error("Failed to update account");
      setData((prevData) =>
        prevData.map((account) =>
          account.ma_nv === currentAccount.ma_nv
            ? { ...account, ...editAccountData }
            : account
        )
      );
      setShowEditAccount(false);
      setCurrentAccount(null);
      alert("Thay đổi thành công!");
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleDeleteAccount = async (ma_nv) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/employees/${ma_nv}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete account");
      setData((prevData) =>
        prevData.filter((account) => account.ma_nv !== ma_nv)
      );
      alert("Đuổi việc thành công!");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleShowAddAccount = () => {
    setShowAddAccount(!showAddAccount);
  };

  const handleShowEditAccount = (account) => {
    setCurrentAccount(account);
    setEditAccountData({
      ten_nv: account.ten_nv,
      gioi_tinh: account.gioi_tinh,
      sdt: account.sdt,
      email: account.email,
      mat_khau: account.mat_khau,
      ma_quyen: account.ma_quyen,
      trang_thai: account.trang_thai,
    });
    setShowEditAccount(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showAddAccount) {
      setNewAccountData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (showEditAccount && currentAccount) {
      setEditAccountData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <div className="container-account">
        <h1>Quản Lí Tài Khoản</h1>
        <div className="container-account_content">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Nhân Viên</th>
                <th>Giới Tính</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Mật Khẩu</th>
                <th>Mã Quyền</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((account) => (
                  <tr key={account.ma_nv}>
                    <td>{account.ma_nv}</td>
                    <td>{account.ten_nv}</td>
                    <td>{account.gioi_tinh}</td>
                    <td>{account.sdt}</td>
                    <td>{account.email}</td>
                    <td>{account.mat_khau}</td>
                    <td>{account.ma_quyen}</td>
                    <td>
                      {account.trang_thai ? "Hoạt động" : "Ngừng hoạt động"}
                    </td>
                    <td>
                      <FaEdit
                        className="edit"
                        onClick={() => handleShowEditAccount(account)}
                      />
                      <FaTrash
                        className="delete"
                        onClick={() => handleDeleteAccount(account.ma_nv)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="add-account_button">
            <button onClick={handleShowAddAccount}>Thêm Tài Khoản</button>
          </div>
        </div>
      </div>

      {showAddAccount && (
        <div className="add-account">
          <h2>Thêm Tài Khoản</h2>
          <div className="add-account_content">
            {/* First Column */}
            <div className="add-account_content__column">
              <div className="add-account_content__content-items">
                <label htmlFor="ten_nv">Tên Nhân Viên</label>
                <input
                  type="text"
                  id="ten_nv"
                  name="ten_nv"
                  value={newAccountData.ten_nv}
                  onChange={handleInputChange}
                />
              </div>

              <div className="add-account_content__content-items">
                <label htmlFor="gioi_tinh">Giới Tính</label>
                <input
                  type="text"
                  id="gioi_tinh"
                  name="gioi_tinh"
                  value={newAccountData.gioi_tinh}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="add-account_content__column">
              <div className="add-account_content__content-items">
                <label htmlFor="sdt">Số Điện Thoại</label>
                <input
                  type="text"
                  id="sdt"
                  name="sdt"
                  value={newAccountData.sdt}
                  onChange={handleInputChange}
                />
              </div>

              <div className="add-account_content__content-items">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newAccountData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="add-account_content__content-items">
                <label htmlFor="mat_khau">Mật Khẩu</label>
                <input
                  type="password"
                  id="mat_khau"
                  name="mat_khau"
                  value={newAccountData.mat_khau}
                  onChange={handleInputChange}
                />
              </div>

              {/* Mã Quyền field moved below Mật Khẩu */}
              <div className="add-account_content__content-items">
                <label htmlFor="ma_quyen">Mã Quyền</label>
                <input
                  type="number"
                  id="ma_quyen"
                  name="ma_quyen"
                  value={newAccountData.ma_quyen}
                  onChange={handleInputChange}
                />
              </div>
              {/* Action Buttons */}
              <div className="add-account_buttons">
                <button onClick={handleAddAccount}>Thêm</button>
                <button onClick={() => setShowAddAccount(false)}>Hủy</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditAccount && currentAccount && (
        <div className="edit-account">
          <h2>Sửa Tài Khoản</h2>
          <div className="edit-account_content">
            <div className="edit-account_content__column">
              <div className="edit-account_content__content-items">
                <label htmlFor="ten_nv">Tên Nhân Viên</label>
                <input
                  type="text"
                  id="ten_nv"
                  name="ten_nv"
                  value={editAccountData.ten_nv}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-account_content__content-items">
                <label htmlFor="gioi_tinh">Giới Tính</label>
                <input
                  type="text"
                  id="gioi_tinh"
                  name="gioi_tinh"
                  value={editAccountData.gioi_tinh}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="edit-account_content__column">
              <div className="edit-account_content__content-items">
                <label htmlFor="sdt">Số Điện Thoại</label>
                <input
                  type="text"
                  id="sdt"
                  name="sdt"
                  value={editAccountData.sdt}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-account_content__content-items">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editAccountData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-account_content__content-items">
                <label htmlFor="mat_khau">Mật Khẩu</label>
                <input
                  type="password"
                  id="mat_khau"
                  name="mat_khau"
                  value={editAccountData.mat_khau}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="edit-account_content__column">
              <div className="edit-account_content__content-items">
                <label htmlFor="ma_quyen">Mã Quyền</label>
                <input
                  type="number"
                  id="ma_quyen"
                  name="ma_quyen"
                  value={editAccountData.ma_quyen}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-account_content__content-items">
                <label htmlFor="trang_thai">Trạng Thái</label>
                <select
                  id="trang_thai"
                  name="trang_thai"
                  value={editAccountData.trang_thai}
                  onChange={handleInputChange}
                >
                  <option value="1">Hoạt động</option>
                  <option value="0">Ngừng hoạt động</option>
                </select>
              </div>
            </div>

            <div className="edit-account_buttons">
              <button onClick={handleEditAccount}>Cập Nhật</button>
              <button onClick={() => setShowEditAccount(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
