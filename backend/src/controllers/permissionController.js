const Permission = require('../models/PermissionModel')

exports.getAllPermissions = async (req ,res) => {
    try {
        const permission =await Permission.PermissionModel.findAll();
        // console.log(permission) // permission luc nay la 1 mang doi tuong
        res.json(permission); // chuyen ve chuoi JSON hien thi len client nguoi dung
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
        // console.log(newPermission)
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
    const {ma_quyen} = req.params
    console.log(ma_quyen)
    try {
        // const functions = await Permission.DetailPermission.findAll({
        //     where: {ma_quyen},
        //     include: [{
        //         model: Permission.FunctionPermission
        //     }]
        // })
        // if(!functions.length) return res.status(404).json({massage: 'khong tim thay chuc nang chi ma quyen nay'})
        // res.status(200).json(functions)
        const permissionWithFunctions = await Permission.PermissionModel.findOne({
            where: { ma_quyen },
            include: [{
                model: Permission.FunctionPermission,
                through: {
                    model: Permission.DetailPermission
                },
                attributes: ['ten_chuc_nang']
            }]
        });
        if (!permissionWithFunctions) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        console.log("kq:", permissionWithFunctions)
        const functionPermissions = permissionWithFunctions.Permission.FunctionPermissions.map(func => ({
            ten_chuc_nang: func.ten_chuc_nang
        }));
        console.log("COMPLETED")
        res.status(200).json({
            ten_quyen: permissionWithFunctions.ten_quyen
        });
    } catch (error) {
        console.log("ERROR")
        res.status(500).json({error: 'Loi khi lay chuc nang'})
    }
};