const Product = require("../models/ProductModel");
const OperatingSystem = require("../models/OperatingSystemModel");
const Brand = require("../models/BrandModel");
const Origin = require("../models/OriginModel");
const WareHouse = require("../models/WareHouseModel");
const PhienBansp = require("../models/PhienBanSPModel");

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
      where: {
        trang_thai: 1, // Thêm điều kiện trạng thái bằng 1
      },
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

// Hàm thêm sản phẩm mới
exports.addProduct = async (req, res) => {
  try {
    // Lấy dữ liệu từ body request
    const {
      ten_sp,
      hinh_anh,
      chip_xu_ly,
      dung_luong_pin,
      kich_thuoc_man,
      camera_truoc,
      camera_sau,
      hdh,
      thuong_hieu,
      xuat_xu,
      khu_vuc_kho,
      phien_ban_san_pham, // Mảng chứa thông tin các phiên bản sản phẩm
    } = req.body;

    // Bắt đầu giao dịch (nếu cần đảm bảo tính toàn vẹn dữ liệu)
    const newProduct = await Product.create({
      ten_sp,
      hinh_anh,
      chip_xu_ly,
      dung_luong_pin,
      kich_thuoc_man,
      camera_truoc,
      camera_sau,
      hdh,
      thuong_hieu,
      xuat_xu,
      khu_vuc_kho,
      so_luong_ton: 0,
      trang_thai: 1,
    });

    // Nếu có thông tin các phiên bản sản phẩm, thêm vào bảng phien_ban_san_pham
    if (phien_ban_san_pham && phien_ban_san_pham.length > 0) {
      const productId = newProduct.ma_sp; // Mã sản phẩm vừa tạo

      // Tạo các phiên bản sản phẩm
      const versions = phien_ban_san_pham.map((version) => ({
        ma_sp: productId,
        ma_ram: version.ma_ram,
        ma_rom: version.ma_rom,
        ma_mau: version.ma_mau,
        gia_nhap: version.gia_nhap,
        gia_xuat: version.gia_xuat,
        ton_kho: 0,
      }));

      // Bulk insert vào bảng phien_ban_san_pham
      await PhienBansp.bulkCreate(versions);
    }

    // Trả về phản hồi thành công
    res.status(201).json({
      success: true,
      message: "Thêm sản phẩm mới thành công.",
      data: newProduct,
    });
  } catch (err) {
    console.error(err);

    // Trả về lỗi
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi thêm sản phẩm.",
    });
  }
};

//////////////
exports.getCountProduct = async (req, res) => {
  try {
    const response = await Product.count();
    res.json({ countProduct: response });
  } catch (error) {
    console.error("fail count product", error);
    throw error;
  }
};

exports.updatedCountProduct = async (req, res) => {
  const { ma_sp } = req.params;
  const { so_luong_moi } = req.body;
  try {
    const Prd = await Product.findByPk(ma_sp);
    if (!Prd)
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
    const newSL = Prd.so_luong_ton + so_luong_moi;
    Prd.so_luong_ton = newSL;
    await Prd.save();
    res
      .status(200)
      .json({ message: "Cập nhật số lượng tồn kho sản phẩm thành công" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật số lượng tồn kho!" });
  }
};
