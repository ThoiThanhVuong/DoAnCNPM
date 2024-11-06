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
        const response = await axios.get("http://localhost:3000/api/brands");
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
  const handleAddBrand = async () => {
    if (newBrand.trim().length === 0) {
      console.log("rỗng");
      setErrorMessage("Tên thương hiệu không được để trống");
      document.getElementById("brand-input").focus();
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/brands", {
        tenthuonghieu: newBrand,
      });
      setBrands((prevBrands) => [...prevBrands, response.data]);
      setNewBrand("");
      setErrorMessage("");
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

  // Handle editing a brand
  const handleEditBrand = async () => {
    if (newBrand.trim() === "") {
      setErrorMessage("Tên thương hiệu không được để trống");
      document.getElementById("brand-input").focus();
      return;
    }

    try {
      const brandToUpdate = brands[editIndex];
      await axios.put(
        `http://localhost:3000/api/brands/${brandToUpdate.mathuonghieu}`,
        { tenthuonghieu: newBrand }
      );
      setBrands((prevBrands) =>
        prevBrands.map((brand, index) =>
          index === editIndex ? { ...brand, tenthuonghieu: newBrand } : brand
        )
      );
      setNewBrand("");
      setEditIndex(null);
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Tên thương hiệu đã tồn tại");
        document.getElementById("brand-input").focus();
      } else {
        setErrorMessage("Lỗi khi cập nhật thương hiệu");
        console.error("Lỗi khi cập nhật thương hiệu:", error);
      }
    }
  };

  // Handle deleting a brand with confirmation
  const handleDeleteBrand = async (index) => {
    const brandToDelete = brands[index];
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa thương hiệu ${brandToDelete.tenthuonghieu}?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/brands/${brandToDelete.mathuonghieu}`
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
    setNewBrand(brands[index].tenthuonghieu);
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
            value={newBrand}
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
                  key={brand.mathuonghieu}
                  onClick={() => handleBrandClick(index)}
                >
                  <td>{brand.mathuonghieu}</td>
                  <td>{brand.tenthuonghieu}</td>
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
          <button
            className="add-btn-modal"
            onClick={handleAddBrand}
            disabled={newBrand.trim() === ""}
          >
            Thêm
          </button>

          <button
            className="edit-btn-modal"
            onClick={handleEditBrand}
            disabled={editIndex === null || newBrand.trim() === ""}
          >
            Sửa
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
