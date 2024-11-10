import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../style/Account.css';

const Account = () => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [data, setData] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [newAccountData, setNewAccountData] = useState({
    employee_id: '',
    username: '',
    password: '',
    email: '',
    full_name: '',
    role: '',
    status: '1',
  });

  const [editAccountData, setEditAccountData] = useState({
    email: '',
    role: '',
    status: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetch('http://localhost:3000/account');
      const accounts = await response.json();
      setData(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const generateEmployeeId = () => {
    const maxId = data.reduce((max, account) => {
      const match = account.employee_id.match(/^nv(\d+)$/);
      if (match) {
        const id = parseInt(match[1], 10);
        return Math.max(max, id);
      }
      return max;
    }, 0);
    return `nv${maxId + 1}`;
  };

  const handleAddAccount = async () => {
    try {
      const employee_id = generateEmployeeId();
      const newAccountWithEmployeeId = { ...newAccountData, employee_id };

      const response = await fetch('http://localhost:3000/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccountWithEmployeeId),
      });
      if (!response.ok) throw new Error('Failed to add account');
      const newAccount = await response.json();
      setData((prevData) => [...prevData, newAccount]);
      setShowAddAccount(false);
      setNewAccountData({
        employee_id: '',
        username: '',
        password: '',
        email: '',
        full_name: '',
        role: '',
        status: '1',
      });
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  const handleEditAccount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/account/${currentAccount.account_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editAccountData),
      });
      if (!response.ok) throw new Error('Failed to update account');
      setData((prevData) => prevData.map(account =>
        account.account_id === currentAccount.account_id ? { ...account, ...editAccountData } : account
      ));
      setShowEditAccount(false);
      setCurrentAccount(null);
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const handleDeleteAccount = async (account_id) => {
    try {
      const response = await fetch(`http://localhost:3000/account/${account_id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete account');
      setData((prevData) => prevData.filter(account => account.account_id !== account_id));
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleShowAddAccount = () => {
    setShowAddAccount(!showAddAccount);
  };

  const handleShowEditAccount = (account) => {
    setCurrentAccount(account);
    setEditAccountData({
      email: account.email,
      role: account.role,
      status: account.status,
    });
    setShowEditAccount(true);
  };

  // Define the handleInputChange function
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
                <th>Tên Đăng Nhập</th>
                <th>Email</th>
                <th>Tên Đầy Đủ</th>
                <th>Vai Trò</th>
                <th>Trạng Thái</th>
                <th>Lần Đăng Nhập Cuối</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((account) => (
                  <tr key={account.account_id}>
                    <td>{account.account_id}</td>
                    <td>{account.username}</td>
                    <td>{account.email}</td>
                    <td>{account.full_name}</td>
                    <td>{account.role}</td>
                    <td>{account.status}</td>
                    <td>{account.last_login || 'Chưa đăng nhập'}</td>
                    <td>
                      <FaEdit className="edit" onClick={() => handleShowEditAccount(account)} />
                      <FaTrash className="delete" onClick={() => handleDeleteAccount(account.account_id)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="add-account_button">
            <button onClick={handleShowAddAccount}>Thêm Tài Khoản</button>
            <button>Thoát</button>
          </div>
        </div>
      </div>

      {showAddAccount && (
        <div className="add-account">
          <h2>Thêm Tài Khoản</h2>
          <div className="add-account_content">
            <div className="add-account_content__column">
              <div className="add-account_content__content-items">
                <label htmlFor="username">Tên Đăng Nhập</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newAccountData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="add-account_content__content-items">
                <label htmlFor="password">Mật Khẩu</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newAccountData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="add-account_content__column">
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
                <label htmlFor="role">Vai Trò</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={newAccountData.role}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="add-account_button">
            <button onClick={handleAddAccount}>Lưu</button>
            <button onClick={handleShowAddAccount}>Thoát</button>
          </div>
        </div>
      )}

      {showEditAccount && currentAccount && (
        <div className="edit-account">
          <h1>Sửa Thông Tin Tài Khoản</h1>
          <div className="edit-account_content">
            <div className="edit-account_content__content-items">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={editAccountData.email}
                onChange={(e) => setEditAccountData({ ...editAccountData, email: e.target.value })}
              />
            </div>
            <div className="edit-account_content__content-items">
              <label>Vai Trò:</label>
              <input
                type="text"
                placeholder="Nhập vai trò"
                value={editAccountData.role}
                onChange={(e) => setEditAccountData({ ...editAccountData, role: e.target.value })}
              />
            </div>
            <div className="edit-account_content__content-items">
              <label>Trạng Thái:</label>
              <select
                value={editAccountData.status}
                onChange={(e) => setEditAccountData({ ...editAccountData, status: e.target.value })}
              >
                <option value="1">Hoạt động</option>
                <option value="0">Ngừng hoạt động</option>
              </select>
            </div>
            <div className="edit-account_button">
              <button onClick={handleEditAccount}>Lưu</button>
              <button onClick={() => setShowEditAccount(false)}>Thoát</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
