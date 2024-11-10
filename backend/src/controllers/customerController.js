const Customer = require('../models/CustomerModel'); // MySQL model

// Fetch all Customer
const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findAll();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải danh sách', error: error.message });
  }
};

// Get Customer by ma_kh
const getCustomerByMaKH = async (req, res) => {
  const { ma_kh } = req.params;
  try {
    const customer = await Customer.findByPk(ma_kh);
    if (!customer) {
      return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tải thông tin nhân viên', error: error.message });
  }
};

// Add a new Customer
const addCustomer = async (req, res) => {
  // Có thể kiểm tra dữ liệu đầu vào ở đây
  try {
    const savedCustomer = await Customer.create(req.body);
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm khách hàng', error: error.message });
  }
};

// Update an Customer by ma_kh
const updateCustomer = async (req, res) => {
  const { ma_nv } = req.params;
  try {
    const updatedCustomer = await Customer.update(ma_kh, req.body);
    if (updatedCustomer[0] === 0) {  // Kiểm tra affectedRows
      return res.status(404).json({ message: 'Không tìm thấy khách hàng để cập nhật' });
    }
    res.status(200).json({ message: 'Khách hàng cập nhật thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Cập nhật khách hàng không thành công', error: error.message });
  }
};

// Delete an Customer by ma_kh
const deleteCustomer = async (req, res) => {
  const { ma_kh } = req.params;
  try {
    const deletedCustomer = await Customer.delete(ma_kh);
    if (deletedCustomer === 0) {  // Kiểm tra affectedRows
      return res.status(404).json({ message: 'Không tìm thấy khách hàng để xóa' });
    }
    res.status(200).json({ message: 'Xóa khách hàng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Xóa khách hàng không thành công', error: error.message });
  }
};

module.exports = {
  getCustomer,
  getCustomerByMaKH,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};