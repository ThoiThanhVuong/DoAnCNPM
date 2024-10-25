const Product = require('../models/ProductModel')

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req ,res) => {
    try {
        const products =await Product.findAll();
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: ' Lỗi khi lấy sản phẩm'})
    }
};

// Lấy sản phẩm theo ID
exports.getProductById =async (req ,res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id);
        if(!product) return res.status(404).json({ error: 'Không tìm thấy sản phẩm'});
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: ' Lỗi khi lấy sản phẩm'})
    }
};

// thêm sản phẩm mới
exports.createProduct = async (req, res) => {
    const { name, price, description, quantity } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            price,
            description,
            quantity
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
    }
};
// Cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, quantity } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        
        product.name = name;
        product.price = price;
        product.description = description;
        product.quantity = quantity;
        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm' });
    }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
        
        await product.destroy();
        res.json({ message: 'Sản phẩm đã được xóa' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
    }
};