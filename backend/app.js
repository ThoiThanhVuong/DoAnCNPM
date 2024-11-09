const express = require("express");
const cors = require("cors");
// const path = require("path");
const bodyParser = require("body-parser");
const productRoutes = require("../backend/src/routes/productRoutes.js");
const brandRoutes = require("../backend/src/routes/brandRoutes.js");
<<<<<<< HEAD
const permissionRoutes = require("../backend/src/routes/permissionRoutes.js");

=======
const thongkeRoutes =require("../backend/src/routes/thongkeRoutes.js")
>>>>>>> b869ef91d90a1c7ec802cfb05262f34afdeb09d3
const app = express();

app.use(cors());
// Middleware để parse JSON
app.use(bodyParser.json());
<<<<<<< HEAD
// middleware để phân tích dữ liệu từ from
app.use(bodyParser.urlencoded({ extended: true }));
=======
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/api/thongke",thongkeRoutes);

>>>>>>> b869ef91d90a1c7ec802cfb05262f34afdeb09d3
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// Định nghĩa các route cho sản phẩm
app.use("/api/products", productRoutes);
// Route
app.use("/api/brands", brandRoutes);

app.use("/api/permission", permissionRoutes);
// Xử lý các yêu cầu không hợp lệ (phục vụ cho SPA)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

module.exports = app;
