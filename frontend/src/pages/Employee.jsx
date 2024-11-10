import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import '../style/Employee.css';
=======
import '../style/Employee.css'
import { FaEdit, FaTrash } from 'react-icons/fa';
>>>>>>> 2e638e15f395c8cfcf31df63180003d9ebf77c61

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({});
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Lấy thông tin nhân viên hiện tại từ API
  useEffect(() => {
    fetch('/api/employee')
      .then((response) => response.json())
      .then((data) => setEmployeeData(data))
      .catch((error) => console.error('Error fetching employee data:', error));
  }, []);

<<<<<<< HEAD
  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message || 'Đổi mật khẩu thành công');
          setShowPasswordChange(false);
          setNewPassword('');
          setConfirmPassword('');
        })
        .catch((error) => console.error('Error changing password:', error));
    } else {
      alert('Mật khẩu không khớp. Vui lòng thử lại.');
=======
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/employee');
      const employees = await response.json();
      setData(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleShowAddEmployee = () => {
    setShowAddEmployee(!showAddEmployee);
  };

  const handleShowEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setEditEmployeeData({
      sdt: employee.sdt,
      email: employee.email,
    });
    setShowEditEmployee(true);
  };

  const handleAddEmployee = async () => {
    try {
      const response = await fetch('http://localhost:5000/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployeeData),
      });
      if (!response.ok) throw new Error('Failed to add employee');
      await fetchEmployees(); // Re-fetch employees after adding
      setShowAddEmployee(false);
      setNewEmployeeData({
        ten_nv: '',
        gioi_tinh: '',
        sdt: '',
        email: '',
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEditEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:5000/employee/${currentEmployee.ma_nv}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEmployeeData),
      });
      if (!response.ok) throw new Error('Failed to update employee');
      await fetchEmployees(); // Re-fetch employees after editing
      setShowEditEmployee(false);
      setCurrentEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (ma_nv) => {
    try {
      const response = await fetch(`http://localhost:5000/employee/${ma_nv}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete employee');
      await fetchEmployees(); // Re-fetch employees after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
>>>>>>> 2e638e15f395c8cfcf31df63180003d9ebf77c61
    }
  };

  return (
    <div className="employee-container">
      <h2>Thông Tin Nhân Viên</h2>
      <div className="employee-info">
        <div className="info-item">
          <strong>Mã Nhân Viên:</strong> <span>{employeeData.ma_nv}</span>
        </div>
        <div className="info-item">
          <strong>Tên Nhân Viên:</strong> <span>{employeeData.ten_nv}</span>
        </div>
        <div className="info-item">
          <strong>Giới Tính:</strong> <span>{employeeData.gioi_tinh}</span>
        </div>
        <div className="info-item">
          <strong>Số Điện Thoại:</strong> <span>{employeeData.sdt}</span>
        </div>
        <div className="info-item">
          <strong>Email:</strong> <span>{employeeData.email}</span>
        </div>
        <div className="info-item">
          <strong>Mã Quyền:</strong> <span>{employeeData.ma_quyen}</span>
        </div>
        <div className="info-item">
          <strong>Trạng Thái:</strong> <span>{employeeData.trang_thai === 1 ? 'Kích hoạt' : 'Không kích hoạt'}</span>
        </div>
        <button onClick={() => setShowPasswordChange(!showPasswordChange)}>
          Đổi Mật Khẩu
        </button>
      </div>

      {showPasswordChange && (
        <div className="password-change">
          <h3>Đổi Mật Khẩu</h3>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Lưu</button>
          <button onClick={() => setShowPasswordChange(false)}>Hủy</button>
        </div>
      )}
    </div>
  );
};

export default Employee;
