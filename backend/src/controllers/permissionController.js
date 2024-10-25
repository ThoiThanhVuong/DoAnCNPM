const Permission = require('../models/PermissionModel')

exports.getAllPermissions = async (req ,res) => {
    try {
        const permission =await Permission.findAll();
        res.json(permission);
    }
    catch (err) {
        res.status(500).json({ error: ' Lỗi khi lấy sản phẩm'})
    }
};