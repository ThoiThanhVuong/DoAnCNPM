// server.js
const app = require("./app");
const sequelize = require("../backend/src/config/db");
const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Kết nối và đồng bộ cơ sở dữ liệu
<<<<<<< HEAD
  // try {
  //   await sequelize.authenticate();
  //   await sequelize.sync({ alter: true });
  //   console.log("Đã kết nối và đồng bộ cơ sở dữ liệu thành công");
  // } catch (error) {
  //   console.error("Lỗi kết nối hoặc đồng bộ cơ sở dữ liệu:", error);
  // }
});
