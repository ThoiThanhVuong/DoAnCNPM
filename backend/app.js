const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const productRoutes = require("../backend/src/routes/productRoutes.js");
const brandRoutes = require("../backend/src/routes/brandRoutes.js");
const permissionRoutes = require("../backend/src/routes/permissionRoutes.js");
const thongkeRoutes = require("../backend/src/routes/thongkeRoutes.js");
const employeeRoutes = require("../backend/src/routes/employeeRoutes.js");
const customerRoutes = require("../backend/src/routes/customerRoutes.js");
const providerRoutes = require("../backend/src/routes/providerRoutes.js");
const loginRoutes = require("./src/routes/loginRoutes.js");
const phieuxuatRoutes = require("./src/routes/phieuxuatRoutes.js")
const warehouseRoutes = require("../backend/src/routes/WareHouseRoutes.js");

const app = express();

//middleware cho phep get/set cookie
app.use(cookieParser());
//middleware de cho phep frontend truy cap vao route cua backend, dong thoi cho phep gui cookie
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// Middleware để parse JSON
app.use(bodyParser.json());

// middleware để phân tích dữ liệu từ from
app.use(bodyParser.urlencoded({ extended: true }));

// Định nghĩa các route api
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/thongke", thongkeRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/phieuxuat", phieuxuatRoutes)
app.use("/api/warehouses",warehouseRoutes);

module.exports = app;
