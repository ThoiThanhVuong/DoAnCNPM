import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../Product/style.css"; // Đường dẫn tới file CSS
import "../Product/next-tab.css";

const UpdateProduct = ({ show, onClose, product }) => {
  const [errors, setErrors] = useState({});
  const [isNextTabVisible, setIsNextTabVisible] = useState(false); // Quản lý trạng thái hiển thị tab tiếp theo
  const [brands, setBrands] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [os, setOs] = useState([]);
  const [area, setArea] = useState([]);
  const [colors, setColors] = useState([]);
  const [ram, setRam] = useState([]);
  const [rom, setRom] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  //
  const [formData, setFormData] = useState({
    productName: "",
    chip: "",
    battery: "",
    screenSize: "",
    frontCamera: "",
    rearCamera: "",
    os: "",
    brand: "",
    origin: "",
    region: "",
  });
  const [newConfig, setNewConfig] = useState({
    rom: "",
    ram: "",
    color: "",
    priceImport: "",
    priceSell: "",
  });

  useEffect(() => {
    if (product) {
      console.log(product);
      setFormData({
        os: product.operatingSystem?.ten_hdh,
        brand: product.brand?.ten_thuong_hieu,
        origin: product.origin?.ten_xuat_xu,
        region: product.storageArea?.ten_kho,
      });
    }
    const fetchData = async () => {
      try {
        const brandResponse = await axios.get(
          "http://localhost:5000/api/brands"
        );
        const originResponse = await axios.get(
          "http://localhost:5000/api/origins"
        );
        const osResponse = await axios.get("http://localhost:5000/api/os");
        const areaReponse = await axios.get(
          "http://localhost:5000/api/warehouses"
        );
        const colorReponse = await axios.get("http://localhost:5000/api/color");
        const ramReponse = await axios.get("http://localhost:5000/api/ram");
        const romReponse = await axios.get("http://localhost:5000/api/rom");

        setBrands(brandResponse.data);
        setOrigins(originResponse.data);
        setOs(osResponse.data);
        setArea(areaReponse.data);
        setColors(colorReponse.data);
        setRam(ramReponse.data);
        setRom(romReponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [product]);

  if (!show) return null;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "", // Xóa lỗi khi nhập
    }));
  };

  const validateConfigForm = () => {
    if (
      !newConfig.rom ||
      !newConfig.ram ||
      !newConfig.color ||
      !newConfig.priceImport ||
      !newConfig.priceSell
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return false;
    }
    if (newConfig.priceImport > newConfig.priceSell) {
      alert("Giá xuất phải lớn hơn hoặc bằng Giá Nhập!");
      return false;
    }
    if (newConfig.priceImport < 0 && newConfig.priceSell < 0) {
      alert("Giá xuất , Giá Nhập lớn hơn 0!");
      return false;
    }
    return true;
  };

  const handleNextTab = () => {
    // if (!validateProductForm()) {
    //   return;
    // }
    setIsNextTabVisible(true);
  };
  const closeNextTab = () => {
    setIsNextTabVisible(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handleCloseButtonClick = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="add-product-modal">
        <button
          type="button"
          className="close-btn"
          onClick={handleCloseButtonClick}
        >
          X
        </button>
        <h2>CHỈNH SỬA SẢN PHẨM</h2>
        {!isNextTabVisible ? (
          <form>
            {/* Upload hình ảnh */}
            <div className="image-upload">
              <button type="button" onClick={handleButtonClick}>
                Hình minh họa
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              {selectedImage && (
                <div className="preview-image">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    width="220"
                    height="135"
                  />
                </div>
              )}
            </div>

            {/* Các trường thông tin sản phẩm */}
            {[
              {
                id: "productName",
                label: "Tên sản phẩm",
                value: product.ten_sp,
              },
              { id: "chip", label: "Chip xử lý", value: product.chip_xu_ly },
              {
                id: "battery",
                label: "Dung lượng pin",
                value: product.dung_luong_pin,
              },
              {
                id: "screenSize",
                label: "Kích thước màn hình",
                value: product.kich_thuoc_man,
              },
              {
                id: "frontCamera",
                label: "Camera trước",
                value: product.camera_truoc,
              },
              {
                id: "rearCamera",
                label: "Camera sau",
                value: product.camera_sau,
              },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id}>{field.label}:</label>
                <input
                  type="text"
                  id={field.id}
                  value={formData[field.id] || field.value}
                  onChange={handleInputChange}
                  placeholder={field.label}
                />
                {errors[field.id] && (
                  <span className="error-message-product">
                    {errors[field.id]}
                  </span>
                )}
              </div>
            ))}
            <div>
              <label htmlFor="os">Hệ điều hành:</label>
              <select
                id="os"
                value={formData.os}
                onChange={(e) => handleInputChange(e)} // Xử lý thay đổi
              >
                <option value="">-- Chọn hệ điều hành --</option>
                {os.map((opt) => (
                  <option key={opt.ma_hdh} value={opt.ma_hdh}>
                    {opt.ten_hdh}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="brand">Thương hiệu:</label>
              <select
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange(e)} // Xử lý thay đổi
              >
                <option value="">-- Chọn thương hiệu --</option>
                {brands.map((opt) => (
                  <option key={opt.ma_thuong_hieu} value={opt.ma_thuong_hieu}>
                    {opt.ten_thuong_hieu}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="origin">Xuất xứ:</label>
              <select
                id="origin"
                value={formData.origin}
                onChange={(e) => handleInputChange(e)} // Xử lý thay đổi
              >
                <option value="">-- Chọn xuất xứ --</option>
                {origins.map((opt) => (
                  <option key={opt.ma_xuat_xu} value={opt.ma_xuat_xu}>
                    {opt.ten_xuat_xu}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="region">Khu vực:</label>
              <select
                id="region"
                value={formData.region}
                onChange={(e) => handleInputChange(e)} // Xử lý thay đổi
              >
                <option value="">-- Chọn khu vực --</option>
                {area.map((opt) => (
                  <option key={opt.ma_kho} value={opt.ma_kho}>
                    {opt.ten_kho}
                  </option>
                ))}
              </select>
            </div>

            {/* Các trường chọn */}

            {/* Nút hành động */}
            <div className="action-buttons">
              <button
                type="button"
                className="btn-next"
                onClick={handleNextTab}
              >
                Tiếp tục
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCloseButtonClick}
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        ) : (
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="rom">ROM</label>
              <select id="rom" value={newConfig.rom}>
                <option value="">Chọn ROM</option>
                {rom.map((opt) => (
                  <option key={opt.ma_rom} value={opt.ma_rom}>
                    {opt.kich_thuoc_rom}
                  </option>
                ))}
              </select>

              <label htmlFor="ram">RAM</label>
              <select id="ram" value={newConfig.ram}>
                <option value="">Chọn RAM</option>
                {ram.map((opt) => (
                  <option key={opt.ma_ram} value={opt.ma_ram}>
                    {opt.kich_thuoc_ram}
                  </option>
                ))}
              </select>

              <label htmlFor="color">Màu sắc</label>
              <select id="color" value={newConfig.color}>
                <option value="">Chọn Màu sắc</option>
                {colors.map((opt) => (
                  <option key={opt.ma_mau} value={opt.ma_mau}>
                    {opt.ten_mau}
                  </option>
                ))}
              </select>

              <label htmlFor="price-import">Giá nhập</label>
              <input
                type="number"
                id="priceImport"
                value={newConfig.priceImport}
                placeholder="Giá Nhập"
              />

              <label htmlFor="price-sell">Giá xuất</label>
              <input
                type="number"
                id="priceSell"
                value={newConfig.priceSell}
                placeholder="Giá Xuất"
              />
            </div>

            <div className="action-buttons-sp">
              <button className="btn btn-add">Thêm cấu hình</button>
              <button className="btn btn-edit">Sửa cấu hình</button>
              <button className="btn btn-delete">Xóa cấu hình</button>
              <button className="btn btn-reset">Làm mới</button>
            </div>

            <div className="table-sp">
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>ROM</th>
                    <th>RAM</th>
                    <th>Màu sắc</th>
                    <th>Giá nhập</th>
                    <th>Giá xuất</th>
                  </tr>
                </thead>
                <tbody>
                  {product.phienBanSanPhams.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.rom.kich_thuoc_rom}</td>
                      <td>{item.ram.kich_thuoc_ram}</td>
                      <td>{item.mauSac?.ten_mau}</td>
                      <td>{item.gia_nhap}</td>
                      <td>{item.gia_xuat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="aciton-add-products">
              <button className="add-prodduct-sp" onClick={null}>
                Sửa sản phẩm
              </button>
              <button className="comback-sp" onClick={closeNextTab}>
                Quay lại trang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateProduct;
