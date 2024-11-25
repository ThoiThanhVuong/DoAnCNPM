import React, { useState, useEffect } from 'react';
import '../style/Employee.css';
import Cookies from "js-cookie";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({});
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const manv = localStorage.getItem("ma_nv"); // Lấy ma_nv từ localStorage
  const [editAccountData, setEditAccountData] = useState({
    mat_khau: "", // Mật khẩu cũ khi bắt đầu
  });
  const handleBackToLogin = () => {
    Cookies.remove("token");
    window.location.reload();
  };

  // Lấy thông tin nhân viên hiện tại từ API
  useEffect(() => {
    if (manv) {
      // Dùng manv để gọi API và lấy dữ liệu nhân viên
      fetch(`http://localhost:5000/api/employee/${manv}`)
        .then((response) => response.json())
        .then((data) => setEmployeeData(data))
        .catch((error) => console.error('Error fetching employee data:', error));
    }
  }, [manv]);

  // Xử lý thay đổi mật khẩu
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    if (newPassword === employeeData.mat_khau) {
      alert("Mật khẩu mới không được trùng với mật khẩu cũ.");
      return;
    }

    const updatedAccountData = { ...editAccountData, mat_khau: newPassword };

    try {
      const response = await fetch(
        `http://localhost:5000/api/employee/${manv}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAccountData),
        }
      );

      if (!response.ok) throw new Error("Failed to update account");

      // Cập nhật lại dữ liệu trong state sau khi thay đổi mật khẩu thành công
      setEmployeeData((prevData) => ({
        ...prevData,
        mat_khau: newPassword, // cập nhật mật khẩu mới
      }));

      setShowPasswordChange(false); // Đóng form thay đổi mật khẩu
      alert("Đổi mật khẩu thành công!");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="employee-container">
      <h2>Thông Tin Nhân Viên</h2>
      <div className="employee-info">
        <div className="em-info-item">
          <strong>Mã Nhân Viên:</strong> <span>{employeeData.ma_nv}</span>
        </div>
        <div className="em-info-item">
          <strong>Tên Nhân Viên:</strong> <span>{employeeData.ten_nv}</span>
        </div>
        <div className="em-info-item">
          <strong>Giới Tính:</strong> <span>{employeeData.gioi_tinh}</span>
        </div>
        <div className="em-info-item">
          <strong>Số Điện Thoại:</strong> <span>{employeeData.sdt}</span>
        </div>
        <div className="em-info-item">
          <strong>Email:</strong> <span>{employeeData.email}</span>
        </div>
        <div className="em-info-item">
          <strong>Mã Quyền:</strong> <span>{employeeData.ma_quyen}</span>
        </div>
        <div className="em-info-item">
          <strong>Trạng Thái:</strong> <span>{employeeData.trang_thai === 1 ? 'Kích hoạt' : 'Không kích hoạt'}</span>
        </div>
        <button onClick={() => setShowPasswordChange(!showPasswordChange)}>
          Đổi Mật Khẩu
        </button>
        <button onClick={handleBackToLogin}>LOGOUT</button>
      </div>

      {showPasswordChange && (
        <div className="em-password-change">
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
