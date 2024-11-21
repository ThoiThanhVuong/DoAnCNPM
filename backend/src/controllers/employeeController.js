const Employee = require('../models/EmployeeModel'); // MySQL model

// Fetch all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải danh sách', error: error.message });
  }
};

// Get employee by ma_nv
const getEmployeeByMaNV = async (req, res) => {
  const { ma_nv } = req.params;
  try {
    const employee = await Employee.findByPk(ma_nv);
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
  const { ten_nv, gioi_tinh, sđt, email, mat_khau, ma_quyen } = req.body; // Các thuộc tính cần thêm
  try {
    const newEmployee = await Employee.create({
      ten_nv,
      gioi_tinh,
      department,
      sđt,
      email,
      mat_khau,
      ma_quyen
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm nhân viên', details: error.message });
  }
};


// Update an employee by ma_nv
const updateEmployee = async (req, res) => {
  const { ma_nv } = req.params;
  const { ten_nv, gioi_tinh, sđt, email, mat_khau, ma_quyen } = req.body; // Các thuộc tính cần cập nhật
  try {
    const employee = await Employee.findByPk(ma_nv);
    if (!employee) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
    
    employee.ten_nv = ten_nv;
    employee.gioi_tinh = gioi_tinh;
    employee.sđt = sđt;
    employee.email = email;
    employee.mat_khau = mat_khau;
    employee.ma_quyen = ma_quyen;
    await employee.save();

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật nhân viên', details: error.message });
  }
};


// Delete an employee by ma_nv
const deleteEmployee = async (req, res) => {
  const { ma_nv } = req.params;
  try {
    const employee = await Employee.findByPk(ma_nv);
    if (!employee) return res.status(404).json({ error: 'Không tìm thấy nhân viên' });
    
    await employee.destroy();
    res.json({ message: 'Nhân viên đã được xóa' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa nhân viên', details: error.message });
  }
};

const countEmployee = async (req, res) => {
     console.log('counnt');
    try {
      const employeeCount = await Employee.count();
      console.log('Debug: Tổng số nhân viên:', employeeCount);
      res.status(200).json({ count: employeeCount })
    } catch (error) {
      console.error('Error counting employees:', error);
      throw error;
    }
 };
module.exports = {
  getEmployees,
  getEmployeeByMaNV,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  countEmployee
};
