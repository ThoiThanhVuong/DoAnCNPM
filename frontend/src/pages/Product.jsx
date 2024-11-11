import React, { useEffect, useState } from "react";
import "../style/product.css";
import { FaPlus, FaEdit, FaTrash, FaFileExcel } from 'react-icons/fa';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // Mặc định tìm theo tên sản phẩm

  // Dữ liệu thử nghiệm để đổ vào bảng
  const sampleData = [
    {
      id: 1,
      code: "1",
      name: "iPhone 14",
      quantity: 100,
      brand: "Apple",
      os: "iOS",
      screenSize: "6.1 inches",
      processor: "A15 Bionic",
      battery: "3279 mAh",
      origin: "USA",
      warehouseArea: "A1"
    },
    {
      id: 2,
      code: "2",
      name: "Samsung Galaxy S23",
      quantity: 150,
      brand: "Samsung",
      os: "Android",
      screenSize: "6.2 inches",
      processor: "Exynos 2200",
      battery: "3900 mAh",
      origin: "Korea",
      warehouseArea: "B2"
    },
    {
      id: 3,
      code: "3",
      name: "Google Pixel 8",
      quantity: 200,
      brand: "Google",
      os: "Android",
      screenSize: "6.3 inches",
      processor: "Tensor G3",
      battery: "4600 mAh",
      origin: "USA",
      warehouseArea: "C3"
    }
  ];

  useEffect(() => {
    // Gán dữ liệu mẫu vào state
    setProducts(sampleData);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="product-list">
      <h2>Danh Sách Sản Phẩm</h2>
      <div className="toolbar">
        <div className="product-actions">
          <button className="btn-add-product"><FaPlus /> Thêm</button>
          <button className="btn-edit-product"><FaEdit /> Sửa</button>
          <button className="btn-delete-product"><FaTrash /> Xóa</button>
          {/*<button className="btn-export-excel"><FaFileExcel /> Xuất Excel</button>*/}
        </div>
        <div className="search-filter">
          <select name="searchBy" value={searchBy} onChange={handleSearchByChange}>
            <option value="name">Tên sản phẩm</option>
            <option value="origin">Xuất xứ</option>
            <option value="brand">Thương hiệu</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã SP</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng tồn</th>
            <th>Thương hiệu</th>
            <th>Hệ điều hành</th>
            <th>Kích thước màn</th>
            <th>Chip xử lý</th>
            <th>Dung lượng pin</th>
            <th>Xuất xứ</th>
            <th>Khu vực kho</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.brand}</td>
              <td>{product.os}</td>
              <td>{product.screenSize}</td>
              <td>{product.processor}</td>
              <td>{product.battery}</td>
              <td>{product.origin}</td>
              <td>{product.warehouseArea}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
