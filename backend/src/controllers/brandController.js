// controllers/brandController.js
const Brand = require('../models/BrandModel');

// Lấy tất cả thương hiệu
exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.json(brands);
    } catch (error) {
        console.error("Lỗi khi lấy thương hiệu:", error);
        res.status(500).json({ error: "Lỗi khi lấy thương hiệu" });
    }
};

// Thêm thương hiệu mới
exports.addBrand = async (req, res) => {
    const { tenthuonghieu } = req.body;

    if (!tenthuonghieu) {
        return res.status(400).json({ error: "Tên thương hiệu không được để trống" });
    }

    try {
        const brandExists = await Brand.findOne({ where: { tenthuonghieu } });
        if (brandExists) {
            return res.status(409).json({ error: "Tên thương hiệu đã tồn tại" });
        }

        const newBrand = await Brand.create({ tenthuonghieu });
        res.status(201).json(newBrand);
    } catch (error) {
        console.error("Lỗi khi thêm thương hiệu:", error);
        res.status(500).json({ error: "Lỗi khi thêm thương hiệu" });
    }
};

// Cập nhật thương hiệu
exports.updateBrand = async (req, res) => {
    const { id } = req.params;
    const { tenthuonghieu } = req.body;

    if (!tenthuonghieu) {
        return res.status(400).json({ error: "Tên thương hiệu không được để trống" });
    }

    try {
        const brandExists = await Brand.findOne({ where: { tenthuonghieu, mathuonghieu: { $ne: id } } });
        if (brandExists) {
            return res.status(409).json({ error: "Tên thương hiệu đã tồn tại" });
        }

        await Brand.update({ tenthuonghieu }, { where: { mathuonghieu: id } });
        res.json({ mathuonghieu: id, tenthuonghieu });
    } catch (error) {
        console.error("Lỗi khi cập nhật thương hiệu:", error);
        res.status(500).json({ error: "Lỗi khi cập nhật thương hiệu" });
    }
};

// Xóa thương hiệu
exports.deleteBrand = async (req, res) => {
    const { id } = req.params;
    
    try {
        await Brand.destroy({ where: { mathuonghieu: id } });
        res.status(204).send();
    } catch (error) {
        console.error("Lỗi khi xóa thương hiệu:", error);
        res.status(500).json({ error: "Lỗi khi xóa thương hiệu" });
    }
};
