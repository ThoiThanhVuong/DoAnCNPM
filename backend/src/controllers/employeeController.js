const Employee = require('../models/EmployeeModel'); // MySQL model

// Fetch all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải danh sách', error: error.message });
  }
};

// Get employee by ma_nv
const getEmployeeByMaNV = async (req, res) => {
  const { ma_nv } = req.params;
  try {
    const employee = await Employee.getByMaNV(ma_nv);
    if (!employee) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải thông tin nhân viên', error: error.message });
  }
};

// Add a new employee
const addEmployee = async (req, res) => {
  // Có thể kiểm tra dữ liệu đầu vào ở đây
  try {
    const savedEmployee = await Employee.create(req.body);
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm nhân viên', error: error.message });
  }
};

// Update an employee by ma_nv
const updateEmployee = async (req, res) => {
  const { ma_nv } = req.params;
  try {
    const updatedEmployee = await Employee.update(ma_nv, req.body);
    if (updatedEmployee[0] === 0) {  // Kiểm tra affectedRows
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật' });
    }
    res.status(200).json({ message: 'Nhân viên cập nhật thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật nhân viên không thành công', error: error.message });
  }
};

// Delete an employee by ma_nv
const deleteEmployee = async (req, res) => {
  const { ma_nv } = req.params;
  try {
    const deletedEmployee = await Employee.delete(ma_nv);
    if (deletedEmployee === 0) {  // Kiểm tra affectedRows
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa' });
    }
    res.status(200).json({ message: 'Xóa nhân viên thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Xóa nhân viên không thành công', error: error.message });
  }
};

module.exports = {
  getEmployees,
  getEmployeeByMaNV,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
