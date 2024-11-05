// Import các thư viện cần thiết
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path"); // Thêm thư viện path

// Tạo một ứng dụng Express
const app = express();

// Cấu hình middleware
app.use(cors());
app.use(express.json()); // Để xử lý JSON request
app.use(express.static(path.join(__dirname, "../frontend/build"))); // Cấu hình phục vụ các file tĩnh từ thư mục build

// Cấu hình kết nối tới cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: "localhost", // Địa chỉ của cơ sở dữ liệu
  user: "root", // Tên đăng nhập
  password: "", // Mật khẩu
  database: "quanlidienthoai", // Tên cơ sở dữ liệu
});

// Kết nối tới cơ sở dữ liệu
db.connect((err) => {
  if (err) {
    console.error("Kết nối đến cơ sở dữ liệu thất bại:", err);
    return;
  }
  console.log("Kết nối đến cơ sở dữ liệu thành công");
});

// Định nghĩa API để lấy tất cả thương hiệu
app.get("/api/brands", (req, res) => {
  db.query("SELECT * FROM thuonghieu", (err, results) => {
    if (err) {
      console.error("Lỗi khi lấy dữ liệu thương hiệu:", err);
      return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
    }
    res.json(results);
  });
});

// Định nghĩa API để thêm thương hiệu mới
app.post("/api/brands", (req, res) => {
  const { tenthuonghieu } = req.body;
  
  // Kiểm tra tên thương hiệu không được để trống
  if (!tenthuonghieu) {
    console.error("Tên thương hiệu không được để trống");
    return res.status(400).json({ error: "Tên thương hiệu không được để trống" });
  }

  // Kiểm tra tên thương hiệu đã tồn tại
  db.query("SELECT * FROM thuonghieu WHERE tenthuonghieu = ?", [tenthuonghieu], (err, results) => {
    if (err) {
      console.error("Lỗi khi kiểm tra thương hiệu:", err);
      return res.status(500).json({ error: "Lỗi khi kiểm tra thương hiệu" });
    }
    
    if (results.length > 0) {
      console.error("Tên thương hiệu đã tồn tại:", tenthuonghieu);
      return res.status(409).json({ error: "Tên thương hiệu đã tồn tại" });
    }

    // Thêm thương hiệu nếu không có lỗi
    db.query("INSERT INTO thuonghieu (tenthuonghieu) VALUES (?)", [tenthuonghieu], (err, result) => {
      if (err) {
        console.error("Lỗi khi thêm thương hiệu:", err);
        return res.status(500).json({ error: "Lỗi khi thêm thương hiệu" });
      }
      console.log("Thêm thương hiệu thành công:", result.insertId);
      res.status(201).json({ mathuonghieu: result.insertId, tenthuonghieu });
    });
  });
});


// Định nghĩa API để cập nhật thương hiệu
app.put("/api/brands/:id", (req, res) => {
  const { id } = req.params;
  const { tenthuonghieu } = req.body;
  if (!tenthuonghieu) {
    return res
      .status(400)
      .json({ error: "Không được để trống tên thương hiệu" });
  }

  // Kiểm tra nếu thương hiệu đã tồn tại
  db.query(
    "SELECT * FROM thuonghieu WHERE tenthuonghieu = ? AND mathuonghieu != ?",
    [tenthuonghieu, id],
    (err, results) => {
      if (err) {
        console.error("Lỗi khi kiểm tra thương hiệu:", err);
        return res.status(500).json({ error: "Lỗi khi kiểm tra thương hiệu" });
      }
      if (results.length > 0) {
        return res.status(409).json({ error: "Tên thương hiệu đã tồn tại" });
      }

      db.query(
        "UPDATE thuonghieu SET tenthuonghieu = ? WHERE mathuonghieu = ?",
        [tenthuonghieu, id],
        (err) => {
          if (err) {
            console.error("Lỗi khi cập nhật thương hiệu:", err);
            return res
              .status(500)
              .json({ error: "Lỗi khi cập nhật thương hiệu" });
          }
          res.json({ mathuonghieu: id, tenthuonghieu });
        }
      );
    }
  );
});

// Định nghĩa API để xóa thương hiệu
app.delete("/api/brands/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM thuonghieu WHERE mathuonghieu = ?", [id], (err) => {
    if (err) {
      console.error("Lỗi khi xóa thương hiệu:", err);
      return res.status(500).json({ error: "Lỗi khi xóa thương hiệu." });
    }
    res.status(204).send(); // Trả về 204 No Content
  });
});

// Đoạn mã này để xử lý các yêu cầu không hợp lệ (phục vụ SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
