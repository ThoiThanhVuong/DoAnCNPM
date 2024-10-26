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

exports.createPermission = async (req, res) => {
    const {ma_quyen, ten_quyen} = req.body
    try {
        const newPermission = await Permission.create({
            ma_quyen,
            ten_quyen
        })
        res.status(201).json(newPermission)
    } catch (error) {
        res.status(500).json({error: 'Loi khi them nhom quyen'})
    }
}

exports.editPermission = async (req, res) => {
    try {
        const {id} = req.params
        const permission = await Permission.create()
    } catch (error) {
        
    }
}
exports.deletePermission = async (req, res) => {
    const { ma_quyen } = req.params;
    try {
        const permission = await Permission.findByPk(ma_quyen)
        if (!permission) return res.status(404).json({ error: 'Không tim thay quyen de xoa' });
        
        await permission.destroy();
        res.json({ message: 'nhom quyen đã được xóa' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa nhom quyen' });
    }
}