const Product = require("../models/ProductModel");
const OperatingSystem = require("../models/OperatingSystemModel");
const Brand = require("../models/BrandModel");
const Origin = require("../models/OriginModel");
const WareHouse = require("../models/WareHouseModel");

// Lấy danh sách tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "ma_sp", // Mã sản phẩm
        "ten_sp", // Tên sản phẩm
        "hinh_anh", // Hình ảnh sản phẩm
        "chip_xu_ly", // Chip xử lý
        "dung_luong_pin", // Dung lượng pin
        "kich_thuoc_man", // Kích thước màn hình
        "camera_truoc", // Camera trước
        "camera_sau", // Camera sau
        "so_luong_ton", // Số lượng tồn
        "mo_ta_sp", // Mô tả sản phẩm
      ],
      include: [
        {
          model: OperatingSystem, // Thêm mô hình hệ điều hành
          as: "operatingSystem", // Alias cho hệ điều hành
          attributes: ["ten_hdh"], // Chỉ lấy tên hệ điều hành
        },
        {
          model: Brand, // Thêm mô hình thương hiệu
          as: "brand", // Alias cho thương hiệu
          attributes: ["ten_thuong_hieu"], // Chỉ lấy tên thương hiệu
        },
        {
          model: Origin, // Thêm mô hình xuất xứ
          as: "origin", // Alias cho xuất xứ
          attributes: ["ten_xuat_xu"], // Chỉ lấy tên xuất xứ
        },
        {
          model: WareHouse, // Thêm mô hình khu vực kho
          as: "storageArea", // Alias cho khu vực kho
          attributes: ["ten_kho"], // Chỉ lấy tên khu vực kho
        },
      ],
    });

    // Trả dữ liệu sản phẩm về frontend
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.",
    });
  }
};
