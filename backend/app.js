const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("../backend/src/routes/productRoutes.js");
const brandRoutes = require("../backend/src/routes/brandRoutes.js");
const permissionRoutes = require("../backend/src/routes/permissionRoutes.js");
const thongkeRoutes =require("../backend/src/routes/thongkeRoutes.js")
const employeeRoutes =require("../backend/src/routes/employeeRoutes.js")
const customerRoutes =require("../backend/src/routes/customerRoutes.js")
const providerRoutes =require("../backend/src/routes/providerRoutes.js")
const loginRoutes = require("./src/routes/loginRoutes.js")

const app = express();

app.use(cors());
// Middleware để parse JSON
app.use(bodyParser.json());

// middleware để phân tích dữ liệu từ from
app.use(bodyParser.urlencoded({ extended: true }));

// Định nghĩa các route api
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/thongke",thongkeRoutes);
app.use("/api/employee",employeeRoutes);
app.use("/api/customers",customerRoutes);
app.use("/api/providers",providerRoutes);
app.use("/api/login", loginRoutes)

module.exports = app;
