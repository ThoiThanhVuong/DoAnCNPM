const Product = require('../models/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error });
        }
    },

    getProductById: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.getById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error });
        }
    },

    createProduct: async (req, res) => {
        const newProduct = req.body; 
        try {
            const productId = await Product.create(newProduct);
            res.status(201).json({ message: 'Tạo Sản Phẩm thành công', productId });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error });
        }
    },

    updateProduct: async (req, res) => {
        const productId = req.params.id;
        const updatedProduct = req.body;
        try {
            const affectedRows = await Product.update(productId, updatedProduct);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }
            res.json({ message: 'Đã cập nhật sản phẩm' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error });
        }
    },

    deleteProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const affectedRows = await Product.delete(productId);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }
            res.json({ message: 'Xóa sản phẩm thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error });
        }
    }
};

module.exports = productController;
