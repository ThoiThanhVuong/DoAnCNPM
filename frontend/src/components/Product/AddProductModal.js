import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../Product/style.css"; // Đường dẫn tới file CSS

const AddProductModal = ({ show, onClose }) => {
  const [brands, setBrands] = useState([]); // Dữ liệu cho select "Thương hiệu"
  const [origins, setOrigins] = useState([]);
  const [os, setOs] = useState([]);
  //const [area, setArea] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null); // Ref để điều khiển input file

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandResponse = await axios.get(
          "http://localhost:5000/api/brands"
        );
        const originResponse = await axios.get(
          "http://localhost:5000/api/origins"
        );
        const osResponse = await axios.get("http://localhost:5000/api/os");
        //const areaReponse = await axios.get("http://localhost:5000/api/area");
        setBrands(brandResponse.data);
        setOrigins(originResponse.data);
        setOs(osResponse.data);
        // setArea(areaReponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!show) return null;

  // Xử lý sự kiện khi chọn file ảnh
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Lưu đường dẫn tạm thời của ảnh để xem trước
    }
  };

  // Xử lý sự kiện khi nhấn nút "Hình minh họa"
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Kích hoạt input file
    }
  };

  // Đóng modal khi nhấn ra ngoài
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      resetForm(); // Reset lại form khi đóng modal
      onClose();
    }
  };

  // Đóng modal khi nhấn nút đóng
  const handleCloseButtonClick = () => {
    resetForm(); // Reset lại form khi đóng modal
    onClose();
  };

  // Hàm reset lại form
  const resetForm = () => {
    setSelectedImage(null); // Reset hình ảnh đã chọn
    // Reset tất cả các input khác
    const formElements = document.querySelectorAll(
      'input[type="text"], select'
    );
    formElements.forEach((element) => {
      element.value = ""; // Đặt lại giá trị cho tất cả các input và select
    });
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
        <h2>THÊM SẢN PHẨM MỚI</h2>
        <form>
          {/* Upload hình ảnh */}
          <div className="image-upload">
            <button type="button" onClick={handleButtonClick}>
              Hình minh họa
            </button>
            <input
              type="file"
              ref={fileInputRef} // Gán ref vào input
              accept="image/*"
              style={{ display: "none" }} // Ẩn input chọn file
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

          {/* Các trường khác */}
          <div>
            <label htmlFor="productName">Tên sản phẩm:</label>
            <input type="text" id="productName" placeholder="Tên sản phẩm" />
          </div>
          <div>
            <label htmlFor="chip">Chip xử lý:</label>
            <input type="text" id="chip" placeholder="Chip xử lý" />
          </div>
          <div>
            <label htmlFor="battery">Dung lượng pin:</label>
            <input type="text" id="battery" placeholder="Dung lượng pin" />
          </div>
          <div>
            <label htmlFor="screenSize">Kích thước màn hình:</label>
            <input
              type="text"
              id="screenSize"
              placeholder="Kích thước màn hình"
            />
          </div>
          <div>
            <label htmlFor="frontCamera">Camera trước:</label>
            <input type="text" id="frontCamera" placeholder="Camera trước" />
          </div>
          <div>
            <label htmlFor="rearCamera">Camera sau:</label>
            <input type="text" id="rearCamera" placeholder="Camera sau" />
          </div>
          <div>
            <label htmlFor="os">Hệ điều hành:</label>
            <select id="os">
              {os.map((oS) => (
                <option key={oS.ma_hdh} value={oS.ma_hdh}>
                  {oS.ten_hdh}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand">Thương hiệu:</label>
            <select id="brand">
              {brands.map((brand) => (
                <option key={brand.ma_thuong_hieu} value={brand.ma_thuong_hieu}>
                  {brand.ten_thuong_hieu}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="origin">Xuất xứ:</label>
            <select id="origin">
              {origins.map((origin) => (
                <option key={origin.ma_xuat_xu} value={origin.ma_xuat_xu}>
                  {origin.ten_xuat_xu}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="region">Khu vực:</label>
            <select id="region"></select>
          </div>

          {/* Nút hành động */}
          <div className="action-buttons">
            <button type="button" className="btn-create">
              Tạo cấu hình
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
      </div>
    </div>
  );
};

export default AddProductModal;
