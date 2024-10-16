const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware để sử dụng CORS và parse JSON
app.use(cors());
app.use(express.json());

// Kết nối với MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quanlidienthoai'
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});
app.get('/homePage', (req, res) => {
    return res.json("from backend")
})
app.get('/employee',(req,res)=>{
  const query ="SELECT * FROM nhanvien";
  db.query(query,(err,data)=>{
    if (err)
      return res.json(err);
      return res.json(data);
  })
})


// // Lắng nghe trên cổng 3000
app.listen(port, () => {
  console.log("listening");
});
