import React, { useState } from "react";
import "../Product/detailProduct.css"
const DetailProductModal = ({ show, onClose, product }) => {
    const [selectedImage, setSelectedImage] = useState("");
    if (!show || !product) return null;
     // Cập nhật ảnh mặc định khi có dữ liệu sản phẩm
  if (selectedImage === "" && product.phienBanSanPhams.length > 0) {
    setSelectedImage(
      `${product.hinh_anh}_${product.phienBanSanPhams[0].mauSac.ten_mau.replace(/\s+/g,"_")}.jpg`
    );

  }

    return (
        
      <div className="modal-overlay">
        <div className="modal-content">
            <h2>Chi tiết sản phẩm</h2>
            <h3>{product.ten_sp}</h3>
            <div className="detail-content">
                <div className="detail-left">
                    <div className="img-detail"></div>
                    <div className="button-color"></div>
                </div>
                <div className="detail-right"></div>
            </div>
        </div>

        <button className="btn-close" onClick={onClose}>
          X
        </button>
      </div>
    );
}
export default DetailProductModal;