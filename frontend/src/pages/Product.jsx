import React, { useEffect, useState } from "react";
import "../style/product.css";
import { FaPlus, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import AddProductModal from "../components/Product/AddProductModal";
import DetailProductModal from "../components/Product/DetailProductModal";
import productService from "../services/productService";

const Product = () => {
  const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // Dữ liệu sản phẩm đã lọc
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [searchBy, setSearchBy] = useState("name"); // Tiêu chí tìm kiếm (tên sản phẩm, thương hiệu, xuất xứ)
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };
  useEffect(() => {
    // Lấy dữ liệu từ backend
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data.data);
        setFilteredProducts(data.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);
  // Hàm xử lý tìm kiếm
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Lọc sản phẩm theo tiêu chí
    const filtered = products.filter((product) => {
      if (searchBy === "name") {
        return product.ten_sp?.toLowerCase().includes(query);
      } else if (searchBy === "brand") {
        return product.brand?.ten_thuong_hieu?.toLowerCase().includes(query);
      } else if (searchBy === "origin") {
        return product.origin?.ten_xuat_xu?.toLowerCase().includes(query);
      }
      return false;
    });

    setFilteredProducts(filtered);
  };

  // Hàm thay đổi tiêu chí tìm kiếm
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };
  const handleDeleteProduct = async (productId) => {
    // Hiển thị thông báo xác nhận trước khi xóa sản phẩm
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      // Gọi API để cập nhật trạng thái của sản phẩm thành 0 (ẩn sản phẩm)
      const response = await productService.deleteProduct(productId);
      if (response.status === 200) {
        // Cập nhật lại trạng thái của sản phẩm trong danh sách mà không cần reload
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.ma_sp === productId
              ? { ...product, trang_thai: 0 } // Ẩn sản phẩm bằng cách cập nhật trang_thai
              : product
          )
        );

        // Cập nhật lại filteredProducts, chỉ hiển thị những sản phẩm có trạng thái khác 0
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter(
            (product) => product.ma_sp !== productId || product.trang_thai !== 0
          )
        );

        alert("Sản phẩm đã được xóa .");
      }
    } catch (err) {
      console.error("Lỗi khi ẩn sản phẩm:", err);
      alert("Có lỗi xảy ra khi ẩn sản phẩm.");
    }
  };

  return (
    <div className="product-list">
      <h2>Danh Sách Sản Phẩm</h2>
      <div className="toolbar">
        <div className="product-actions">
          <button onClick={handleAddProduct} className="btn-add-product">
            <FaPlus /> Thêm
          </button>
        </div>
        <div className="search-filter">
          <select
            name="searchBy"
            value={searchBy}
            onChange={handleSearchByChange}
          >
            <option value="name">Tên sản phẩm</option>
            <option value="origin">Xuất xứ</option>
            <option value="brand">Thương hiệu</option>
          </select>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="table-products">
        <table>
          <thead className="rows">
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
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts
              .filter((product) => product.trang_thai !== 0)
              .map((product) => (
                <tr key={product.ma_sp}>
                  <td>{product.ma_sp}</td>
                  <td>{product.ten_sp || "Không có thông tin"}</td>
                  <td>{product.so_luong_ton || "Không có thông tin"}</td>
                  <td>
                    {product.brand?.ten_thuong_hieu || "Không có thông tin"}
                  </td>
                  <td>
                    {product.operatingSystem?.ten_hdh || "Không có thông tin"}
                  </td>
                  <td>
                    {product.kich_thuoc_man
                      ? `${product.kich_thuoc_man} inch`
                      : "Không có thông tin"}
                  </td>
                  <td>{product.chip_xu_ly || "Không có thông tin"}</td>
                  <td>
                    {product.dung_luong_pin
                      ? `${product.dung_luong_pin} mAh`
                      : "Không có thông tin"}
                  </td>
                  <td>{product.origin?.ten_xuat_xu || "Không có thông tin"}</td>
                  <td>
                    {product.storageArea?.ten_kho || "Không có thông tin"}
                  </td>
                  <td>
                    <div className="action-button">
                      <button
                        className="btn-view-detail"
                        onClick={() => handleViewDetail(product)}
                      >
                        Chi Tiết
                        <FaInfoCircle />
                      </button>
                      <button className="btn-edit-product">
                        Sửa
                        <FaEdit />
                      </button>
                      <button
                        className="btn-delete-product"
                        onClick={() => handleDeleteProduct(product.ma_sp)}
                      >
                        Xóa
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AddProductModal show={showModal} onClose={handleCloseModal} />
      <DetailProductModal
        show={showDetailModal}
        onClose={handleCloseDetailModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default Product;
