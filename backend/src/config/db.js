const { Sequelize } = require("sequelize");

// Kết nối MySQL với Sequelize
<<<<<<< HEAD
const sequelize = new Sequelize('quanli_khohang', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
=======
const sequelize = new Sequelize("quanlidienthoai", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
>>>>>>> 000c129fb56eb4774b5a7dac08ffb1d54c564149
});
// Kiểm tra kết nối
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Kết nối đến cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Kết nối đến cơ sở dữ liệu thất bại:", error);
  }
}
// Đồng bộ các mô hình
async function syncModels() {
  try {
    await sequelize.sync({ alter: true }); // `alter: true` để tự động cập nhật thay đổi trong bảng mà không xóa dữ liệu
    console.log("Đồng bộ các mô hình thành công");
  } catch (error) {
    console.error("Lỗi khi đồng bộ các mô hình:", error);
  }
}
// Gọi hàm testConnection và syncModels
testConnection();
syncModels();

// Xuất đối tượng `sequelize` để sử dụng trong các model
module.exports = sequelize;
