const Product = require("../models/ProductModel");
const OperatingSystem = require("../models/OperatingSystemModel");
const Brand = require("../models/BrandModel");
const Origin = require("../models/OriginModel");
const WareHouse = require("../models/WareHouseModel");
//const PhienBansp = require("../models/PhienBanSPModel");
const { sequelize ,PhienBanSPModel,Ram,Rom,Color} = require('../models/Relationship');
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
          attributes: ["ma_kho","ten_kho"], // Chỉ lấy tên khu vực kho
        },{
          model:PhienBanSPModel,
          as:"phienBanSanPhams",
          attributes:[
            "ma_phien_ban_sp",
            "gia_nhap",
            "gia_xuat",
            "ton_kho",
            "trang_thai",
          ],
          include:[
            {
              model:Ram,
              as:"ram",
              attributes:["kich_thuoc_ram"],
            },
            {
              model:Rom,
              as:"rom",
              attributes:["kich_thuoc_rom"],
            },
            {
              model:Color,
              as:"mauSac",
              attributes:["ten_mau"]
            }
          ],
          where:{
            trang_thai :1,
          }
        }
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
  const t = await sequelize.transaction();
  try {
    // Lấy dữ liệu từ body request
    const { productData, configurationsData } = req.body;
    //  Thêm sản phẩm
   
    const newProduct = await Product.create(productData,{ transaction: t });

      console.log(productId);
      // Tạo các phiên bản sản phẩm
      const versions = configurationsData.map((version) => ({
        ma_sp: productId,
        ma_ram: parseInt(version.ma_ram,10),
        ma_rom: parseInt(version.ma_rom,10),
        ma_mau: parseInt(version.ma_mau,10) ,
        gia_nhap: parseInt(version.gia_nhap),
        gia_xuat: parseInt(version.gia_xuat),
        ton_kho: 0,
        trang_thai:1,
      }));

      // Bulk insert vào bảng phien_ban_san_pham
      await PhienBanSPModel.bulkCreate(versions,{ transaction: t });
      await t.commit();
    // Trả về phản hồi thành công
    res.status(201).json({
      success: true,
      message: "Thêm sản phẩm mới thành công.",
      data: newProduct,
    });
  } catch (err) {
    await t.rollback();
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

exports.updateWarehouseProduct = async (req, res) => {
  const { ma_sp} = req.params;
  const { ma_kho }= req.body;
  try {
    const product = await Product.findByPk(ma_sp);
    if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
    product.khu_vuc_kho = ma_kho;
    await product.save();
    res.status(200).json({ message: "Cập nhật khu vực kho thành công" });
  } catch (error) {
    res.status(500).json({error : "Lỗi cập nhật khu vực kho"})
  }
}

