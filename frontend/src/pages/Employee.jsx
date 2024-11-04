import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Employee = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [data, setData] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [newEmployeeData, setNewEmployeeData] = useState({
    ten_nv: '',
    gioi_tinh: '',
    sdt: '',
    email: '',
  });

  const [editEmployeeData, setEditEmployeeData] = useState({
    sdt: '',
    email: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/employee');
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
      const response = await fetch('http://localhost:3000/employee', {
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
      const response = await fetch(`http://localhost:3000/employee/${currentEmployee.ma_nv}`, {
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
      const response = await fetch(`http://localhost:3000/employee/${ma_nv}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete employee');
      await fetchEmployees(); // Re-fetch employees after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <div className="container-employee">
        <h1>Quản Lí Nhân Viên</h1>
        <div className="container-employee_content">
          <table>
            <thead>
              <tr>
                <th>Mã Nhân Viên</th>
                <th>Họ Tên Nhân Viên</th>
                <th>Giới Tính</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((employee) => (
                  <tr key={employee.ma_nv}>
                    <td>{employee.ma_nv}</td>
                    <td>{employee.ten_nv}</td>
                    <td>{employee.gioi_tinh}</td>
                    <td>{employee.sdt}</td>
                    <td>{employee.email}</td>
                    <td>
                      <FaEdit className="edit" onClick={() => handleShowEditEmployee(employee)} />
                      <FaTrash className="delete" onClick={() => handleDeleteEmployee(employee.ma_nv)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="container-employee_button">
            <button onClick={handleShowAddEmployee}>Thêm Nhân Viên</button>
            <button>Thoát</button>
          </div>
        </div>
      </div>

      {/* Modal thêm nhân viên */}
      {showAddEmployee && (
        <div className="add-employee">
          <h1>Thêm Nhân Viên</h1>
          <div className="add-employee_content">
            <div className="add-employee_content__content-items">
              <label>Họ Tên Nhân Viên:</label>
              <input
                type="text"
                placeholder="Nhập họ tên nhân viên"
                value={newEmployeeData.ten_nv}
                onChange={(e) => setNewEmployeeData({ ...newEmployeeData, ten_nv: e.target.value })}
              />
            </div>
            <div className="add-employee_content__content-items">
              <label>Giới Tính:</label>
              <input
                type="text"
                placeholder="Nhập giới tính"
                value={newEmployeeData.gioi_tinh}
                onChange={(e) => setNewEmployeeData({ ...newEmployeeData, gioi_tinh: e.target.value })}
              />
            </div>
            <div className="add-employee_content__content-items">
              <label>Số Điện Thoại:</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={newEmployeeData.sdt}
                onChange={(e) => setNewEmployeeData({ ...newEmployeeData, sdt: e.target.value })}
              />
            </div>
            <div className="add-employee_content__content-items">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={newEmployeeData.email}
                onChange={(e) => setNewEmployeeData({ ...newEmployeeData, email: e.target.value })}
              />
            </div>
            <div className="add-employee_button">
              <button onClick={handleAddEmployee}>Lưu</button>
              <button onClick={handleShowAddEmployee}>Thoát</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa nhân viên */}
      {showEditEmployee && currentEmployee && (
        <div className="edit-employee">
          <h1>Sửa Thông Tin Nhân Viên</h1>
          <div className="edit-employee_content">
            <div className="edit-employee_content__content-items">
              <label>Số Điện Thoại:</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={editEmployeeData.sdt}
                onChange={(e) => setEditEmployeeData({ ...editEmployeeData, sdt: e.target.value })}
              />
            </div>
            <div className="edit-employee_content__content-items">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={editEmployeeData.email}
                onChange={(e) => setEditEmployeeData({ ...editEmployeeData, email: e.target.value })}
              />
            </div>
            <div className="edit-employee_button">
              <button onClick={handleEditEmployee}>Lưu</button>
              <button onClick={() => setShowEditEmployee(false)}>Thoát</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
