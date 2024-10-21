const db = require('../config/db');

const Product = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM sanpham', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM sanpham WHERE masp = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result[0]);
            });
        });
    },
    create: (productData) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO sanpham SET ?', productData, (err, result) => {
                if (err) reject(err);
                resolve({ id: result.insertId, ...productData });
            });
        });
    },
    update: (id, productData) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE sanpham SET ? WHERE masp = ?', [productData, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM sanpham WHERE masp = ?', [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
};

module.exports = Product;
