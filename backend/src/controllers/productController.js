const Product = require('../models/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve products' });
        }
    },

    getProductById: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.getProductById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve product' });
        }
    },

    createProduct: async (req, res) => {
        const newProduct = req.body; 
        try {
            const productId = await Product.createProduct(newProduct);
            res.status(201).json({ message: 'Product created', productId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product' });
        }
    },

    updateProduct: async (req, res) => {
        const productId = req.params.id;
        const updatedProduct = req.body;
        try {
            const affectedRows = await Product.updateProduct(productId, updatedProduct);
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product updated' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update product' });
        }
    },

    deleteProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const affectedRows = await Product.deleteProduct(productId);
            if (affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
};

module.exports = productController;
