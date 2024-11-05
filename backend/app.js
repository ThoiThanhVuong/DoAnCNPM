const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const sequelize = require("../backend/src/config/db.js"); // Import kết nối cơ sở dữ liệu
const productRoutes = require("../backend/src/routes/productRoutes.js");
const brandRoutes = require("../backend/src/routes/brandRoutes.js");

const app = express();

app.use(cors());
// Middleware để parse JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));
// Định nghĩa các route cho sản phẩm
app.use("/api/products", productRoutes);
// Route
app.use("/api/brands", brandRoutes);
// Xử lý các yêu cầu không hợp lệ (phục vụ cho SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
// Khởi động server
const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Kết nối và đồng bộ cơ sở dữ liệu
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Đã kết nối và đồng bộ cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi kết nối hoặc đồng bộ cơ sở dữ liệu:", error);
  }
});

module.exports = app;
