const Brand = require("../models/BrandModel");
const { Op } = require("sequelize");

// Lấy tất cả thương hiệu
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({
      attributes: ["ma_thuong_hieu", "ten_thuong_hieu"], // Chỉ lấy cột ma_thuong_hieu và ten_thuong_hieu
    });
    res.json(brands);
  } catch (error) {
    console.error("Lỗi khi lấy thương hiệu:", error);
    res.status(500).json({ error: "Lỗi khi lấy thương hiệu" });
  }
};

// Thêm thương hiệu mới
exports.addBrand = async (req, res) => {
  const { ten_thuong_hieu } = req.body;

  console.log("Dữ liệu nhận được:", req.body); // Log dữ liệu nhận từ frontend

  if (!ten_thuong_hieu || ten_thuong_hieu.trim() === "") {
    return res
      .status(400)
      .json({ error: "Tên thương hiệu không được để trống" });
  }

  try {
    const brandExists = await Brand.findOne({ where: { ten_thuong_hieu } });
    if (brandExists) {
      return res.status(409).json({ error: "Tên thương hiệu đã tồn tại" });
    }

    const newBrand = await Brand.create({ ten_thuong_hieu });
    console.log("Thêm thương hiệu thành công:", newBrand);
    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Lỗi khi thêm thương hiệu:", error.message);
    res.status(500).json({ error: error.message }); // Trả thông báo lỗi chi tiết
  }
};

// Cập nhật thương hiệu
exports.updateBrand = async (req, res) => {
  const { id } = req.params;
  const { ten_thuong_hieu } = req.body;

  // Kiểm tra nếu tên thương hiệu rỗng
  if (!ten_thuong_hieu || ten_thuong_hieu.trim() === "") {
    return res
      .status(400)
      .json({ error: "Tên thương hiệu không được để trống" });
  }

  try {
    // Kiểm tra nếu tên thương hiệu đã tồn tại (không phải là chính thương hiệu đang sửa)
    const brandExists = await Brand.findOne({
      where: {
        ten_thuong_hieu,
        ma_thuong_hieu: { [Op.ne]: id }, // Sử dụng Op.ne để so sánh khác
      },
    });

    if (brandExists) {
      return res.status(409).json({ error: "Tên thương hiệu đã tồn tại" });
    }

    // Cập nhật thương hiệu
    const [updated] = await Brand.update(
      { ten_thuong_hieu },
      { where: { ma_thuong_hieu: id } }
    );

    // Kiểm tra xem có thương hiệu nào được cập nhật không
    if (updated) {
      const updatedBrand = await Brand.findOne({
        where: { ma_thuong_hieu: id },
      });
      res.json(updatedBrand); // Trả về thông tin thương hiệu đã cập nhật
    } else {
      res.status(404).json({ error: "Không tìm thấy thương hiệu để cập nhật" });
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thương hiệu:", error);
    res.status(500).json({ error: error.message });
  }
};

// Xóa thương hiệu
exports.deleteBrand = async (req, res) => {
  const { id } = req.params;

  try {
    const brandToDelete = await Brand.findOne({
      where: { ma_thuong_hieu: id },
    });
    if (!brandToDelete) {
      return res.status(404).json({ error: "Thương hiệu không tồn tại" });
    }

    await Brand.destroy({ where: { ma_thuong_hieu: id } });
    res.status(204).send();
  } catch (error) {
    console.error("Lỗi khi xóa thương hiệu:", error);
    res.status(500).json({ error: "Lỗi khi xóa thương hiệu" });
  }
};
