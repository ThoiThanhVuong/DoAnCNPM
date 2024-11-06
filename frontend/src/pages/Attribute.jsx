import React, { useState } from "react";
import { FaAndroid } from "react-icons/fa";
import { GiFactory } from "react-icons/gi";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { IoIosColorFilter } from "react-icons/io";
import { BsMemory } from "react-icons/bs";
import { IoHardwareChipOutline } from "react-icons/io5";
import BrandModal from "../components/Atrribute/BrandModal"; // Nhập BrandModal
import "../style/Attribute.css";

const Attribute = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="attribute-container">
      <div className="attribute-item" onClick={openModal}>
        <MdOutlineBrandingWatermark
          style={{ color: "#f39c12", fontSize: "3.5em" }}
        />
        <p>Thương hiệu</p>
      </div>
      <div className="attribute-item">
        <GiFactory style={{ color: "#e74c3c", fontSize: "3.5em" }} />
        <p>Xuất xứ</p>
      </div>
      <div className="attribute-item">
        <FaAndroid style={{ color: "#27ae60", fontSize: "3.5em" }} />
        <p>Hệ điều hành</p>
      </div>
      <div className="attribute-item">
        <BsMemory style={{ color: "#3498db", fontSize: "3.5em" }} />
        <p>Ram</p>
      </div>
      <div className="attribute-item">
        <IoHardwareChipOutline
          style={{ color: "#95a5a6", fontSize: "3.5em" }}
        />{" "}
        {/* Màu sắc đã được thêm */}
        <p>Rom</p>
      </div>
      <div className="attribute-item">
        <IoIosColorFilter style={{ color: "#e67e22", fontSize: "3.5em" }} />
        <p>Màu sắc</p>
      </div>

      {/* Hiển thị modal nếu isModalOpen là true */}
      {isModalOpen && <BrandModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default Attribute;
