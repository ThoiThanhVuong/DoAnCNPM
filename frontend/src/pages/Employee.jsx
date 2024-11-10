import React, { useState, useEffect } from 'react';
import '../style/Employee.css';

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
