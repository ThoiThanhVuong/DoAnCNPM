const db = require('../config/db');

class Product {
    static getAllProducts() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM products';
            db.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static getProductById(productId) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM products WHERE id = ?';
            db.query(sql, [productId], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data[0]);
                }
            });
        });
    }

    static createProduct(newProduct) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO products SET ?';
            db.query(sql, newProduct, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.insertId);
                }
            });
        });
    }

    static updateProduct(productId, updatedProduct) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE products SET ? WHERE id = ?';
            db.query(sql, [updatedProduct, productId], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.affectedRows);
                }
            });
        });
    }

    static deleteProduct(productId) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM products WHERE id = ?';
            db.query(sql, [productId], (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.affectedRows);
                }
            });
        });
    }
}

module.exports = Product;
