const Permission = require('../models/PermissionModel')

exports.getAllPermissions = async (req ,res) => {
    try {
        const permission =await Permission.PermissionModel.findAll();
        res.json(permission);
    }
    catch (err) {
        res.status(500).json({ error: ' Lỗi khi lấy sản phẩm'})
    }
};

exports.createPermission = async (req, res) => {
    const {ma_quyen, ten_quyen} = req.body
    try {
        const newPermission = await Permission.PermissionModel.create({
            ma_quyen,
            ten_quyen
        })
        res.status(201).json(newPermission)
    } catch (error) {
        res.status(500).json({error: 'Loi khi them nhom quyen'})
    }
}

// exports.editPermission = async (req, res) => {
//     try {
//         const {id} = req.params
//         const permission = await Permission.PermissionModel.create()
//     } catch (error) {
        
//     }
// }
exports.deletePermission = async (req, res) => {
    const { ma_quyen } = req.params;
    console.log(ma_quyen)
    try {
        const permission = await Permission.PermissionModel.findByPk(ma_quyen)
        if (!permission) return res.status(404).json({ error: 'Không tim thay quyen de xoa' });
        
        await permission.destroy();
        res.json({ message: 'nhom quyen đã được xóa' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xóa nhom quyen' });
    }
}

exports.getAllFunctionPermission = async (req, res) => {
    try {
        const permissions = await Permission.PermissionModel.findAll({
            include: {
                model: Permission.DetailPermission,
                as: 'chiTietQuyen',
                include: {
                    model: Permission.FunctionPermission,
                    as: 'chucNang',
                    attributes: ['ten_chuc_nang']
                },
                attributes: []
            },
            attributes: ['ten_quyen']
        });

        const result = permissions.map(permission => {
            return {
                ten_quyen: permission.ten_quyen,
                chuc_nang: permission.chiTietQuyen.map(detail => detail.chucNang.ten_chuc_nang)
            };
        });
        
        res.json(result); // Trả về result đã được định dạng
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy tên quyền và tên chức năng' });
    }
};