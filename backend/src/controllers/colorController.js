const Color = require("../models/ColorModel");
const { Op } = require("sequelize");

// Lấy tất cả màu sắc
exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll({
      attributes: ["ma_mau", "ten_mau"], // Lấy các thuộc tính của màu sắc
    });
    res.json(colors);
  } catch (error) {
    console.error("Lỗi khi lấy màu sắc:", error);
    res.status(500).json({ error: "Lỗi khi lấy màu sắc từ cơ sở dữ liệu" });
  }
};

// Thêm màu sắc mới
exports.addColor = async (req, res) => {
  const { ten_mau } = req.body;

  if (!ten_mau || ten_mau.trim() === "") {
    return res.status(400).json({ error: "Tên màu sắc không được để trống" });
  }

  try {
    const colorExists = await Color.findOne({ where: { ten_mau } });
    if (colorExists) {
      return res.status(409).json({ error: "Tên màu sắc đã tồn tại" });
    }

    const newColor = await Color.create({ ten_mau });
    res.status(201).json(newColor);
  } catch (error) {
    console.error("Lỗi khi thêm màu sắc:", error.message);
    res.status(500).json({ error: "Lỗi khi thêm màu sắc vào cơ sở dữ liệu" });
  }
};

// Cập nhật màu sắc
exports.updateColor = async (req, res) => {
  const { id } = req.params;
  const { ten_mau } = req.body;

  if (!ten_mau || ten_mau.trim() === "") {
    return res.status(400).json({ error: "Tên màu sắc không được để trống" });
  }

  try {
    const colorExists = await Color.findOne({
      where: {
        ten_mau,
        ma_mau: { [Op.ne]: id }, // Kiểm tra tên màu sắc đã tồn tại chưa
      },
    });

    if (colorExists) {
      return res.status(409).json({ error: "Tên màu sắc đã tồn tại" });
    }

    const [updated] = await Color.update(
      { ten_mau },
      { where: { ma_mau: id } }
    );

    if (updated) {
      const updatedColor = await Color.findOne({
        where: { ma_mau: id },
      });
      res.json(updatedColor);
    } else {
      res.status(404).json({ error: "Không tìm thấy màu sắc để cập nhật" });
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật màu sắc:", error);
    res
      .status(500)
      .json({ error: "Lỗi khi cập nhật màu sắc trong cơ sở dữ liệu" });
  }
};

// Xóa màu sắc
exports.deleteColor = async (req, res) => {
  const { id } = req.params;

  try {
    const colorToDelete = await Color.findOne({
      where: { ma_mau: id },
    });
    if (!colorToDelete) {
      return res.status(404).json({ error: "Màu sắc không tồn tại" });
    }

    await Color.destroy({ where: { ma_mau: id } });
    res.status(200).json({ message: "Màu sắc đã bị xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa màu sắc:", error);
    res.status(500).json({ error: "Lỗi khi xóa màu sắc từ cơ sở dữ liệu" });
  }
};
