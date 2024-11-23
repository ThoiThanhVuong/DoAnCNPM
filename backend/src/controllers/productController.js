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
exports.getCountProduct = async (req, res) => {
  try {
    const response =await Product.count();
    res.json({countProduct:response});
  } catch (error) {
    console.error("fail count product", error);
    throw error;
  }
}

exports.updatedCountProduct = async (req, res) => {

  const {ma_sp} = req.params;
    const {so_luong_moi} = req.body;
    try{
        const Prd = await Product.findByPk(ma_sp);
        if(!Prd)
            return res.status(404).json({ message: 'Sản phẩm không tồn tại!' });
        const newSL = Prd.so_luong_ton + so_luong_moi;
        Prd.so_luong_ton = newSL;
        await Prd.save();
        res.status(200).json({ message: 'Cập nhật số lượng tồn kho sản phẩm thành công'});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật số lượng tồn kho!' });
    }
}
