import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import "../Atrribute/BrandModal.css";

const BrandModal = ({ isOpen, onClose }) => {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch brands when modal is open
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setErrorMessage("Lỗi khi tải danh sách thương hiệu.");
      }
    };

    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  // Handle adding a new brand
  const handleAddBrand = async (e) => {
    e.preventDefault(); // Ngừng hành động mặc định

    if (!newBrand || newBrand.trim() === "") {
      setErrorMessage("Tên thương hiệu không được để trống");
      document.getElementById("brand-input").focus();
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/brands", {
        ten_thuong_hieu: newBrand, // Sử dụng tên cột đúng
      });
      setBrands((prevBrands) => [...prevBrands, response.data]);
      setNewBrand("");
      setErrorMessage(""); // Xóa thông báo lỗi sau khi thành công
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Tên thương hiệu đã tồn tại");
        document.getElementById("brand-input").focus();
      } else {
        setErrorMessage("Lỗi khi thêm thương hiệu");
        console.error("Lỗi khi thêm thương hiệu:", error);
      }
    }
  };

  const handleEditBrand = async () => {
    if (newBrand.trim() === "") {
      setErrorMessage("Tên thương hiệu không được để trống");
      document.getElementById("brand-input").focus();
      return;
    }

    try {
      const brandToUpdate = brands[editIndex];

      // Gửi yêu cầu PUT để cập nhật tên thương hiệu
      await axios.put(
        `http://localhost:5000/api/brands/${brandToUpdate.ma_thuong_hieu}`,
        { ten_thuong_hieu: newBrand } // Cập nhật tên thương hiệu
      );

      // Cập nhật lại danh sách thương hiệu trong state
      setBrands((prevBrands) =>
        prevBrands.map((brand, index) =>
          index === editIndex ? { ...brand, ten_thuong_hieu: newBrand } : brand
        )
      );

      // Reset các giá trị sau khi cập nhật thành công
      setNewBrand("");
      setEditIndex(null);
      setErrorMessage(""); // Xóa thông báo lỗi nếu có
    } catch (error) {
      // Kiểm tra lỗi phản hồi từ backend
      if (error.response) {
        if (error.response.status === 409) {
          // Lỗi khi tên thương hiệu đã tồn tại
          setErrorMessage("Tên thương hiệu đã tồn tại");
        } else if (error.response.status === 400) {
          // Lỗi tên thương hiệu trống
          setErrorMessage("Tên thương hiệu không được để trống");
        } else {
          setErrorMessage("Lỗi khi cập nhật thương hiệu");
          console.error("Lỗi khi cập nhật thương hiệu:", error);
        }
      } else {
        // Nếu có lỗi mạng (network error)
        setErrorMessage("Lỗi mạng, vui lòng thử lại");
        console.error("Lỗi mạng:", error);
      }
      document.getElementById("brand-input").focus(); // Focus vào input nếu có lỗi
    }
  };

  // Handle deleting a brand with confirmation
  const handleDeleteBrand = async (index) => {
    const brandToDelete = brands[index];
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa thương hiệu ${brandToDelete.ten_thuong_hieu}?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/brands/${brandToDelete.ma_thuong_hieu}` // Xóa đúng theo mã thương hiệu
      );
      setBrands((prevBrands) => prevBrands.filter((_, i) => i !== index));
    } catch (error) {
      setErrorMessage("Lỗi khi xóa thương hiệu");
      console.error("Error deleting brand:", error);
    }
  };

  // Handle selecting a brand for editing
  const handleBrandClick = (index) => {
    setEditIndex(index);
    setNewBrand(brands[index].ten_thuong_hieu); // Lấy tên thương hiệu từ bảng
    setErrorMessage("");
  };

  // Render modal if open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>THƯƠNG HIỆU SẢN PHẨM</h2>
        <button className="close-btn" onClick={onClose}>
          <MdClose />
        </button>
        <div className="input-container">
          <label>Tên thương hiệu</label>
          <input
            id="brand-input"
            type="text"
            placeholder="Nhập tên thương hiệu"
            value={newBrand || ""}
            onChange={(e) => setNewBrand(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>

        <div className="brand-table-container">
          <table className="brand-table">
            <thead>
              <tr>
                <th>Mã thương hiệu</th>
                <th>Tên thương hiệu</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr
                  key={brand.ma_thuong_hieu}
                  onClick={() => handleBrandClick(index)}
                >
                  <td>{brand.ma_thuong_hieu}</td>
                  <td>{brand.ten_thuong_hieu}</td>
                  <td>
                    <button
                      className="btn-delete-modal"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBrand(index);
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-container">
          <button className="add-btn-modal" onClick={handleAddBrand}>
            Thêm
          </button>

          <button className="edit-btn-modal" onClick={handleEditBrand}>
            Sửa
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
