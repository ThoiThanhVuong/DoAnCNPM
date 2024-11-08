const express = require("express");
const cors = require("cors");
// const path = require("path");
const bodyParser = require("body-parser");
const productRoutes = require("../backend/src/routes/productRoutes.js");
const brandRoutes = require("../backend/src/routes/brandRoutes.js");

const app = express();

app.use(cors());
// Middleware để parse JSON
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// Định nghĩa các route cho sản phẩm
app.use("/api/products", productRoutes);
// Route
app.use("/api/brands", brandRoutes);
// Xử lý các yêu cầu không hợp lệ (phục vụ cho SPA)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

module.exports = app;
