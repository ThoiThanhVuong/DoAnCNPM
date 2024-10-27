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

exports.getAllFeaturePermission = async (req, res) => {
    const {ma_quyen} = req.params
    try {
        const result = await Permission.PermissionModel.findByPk(ma_quyen, {
            include:[{
                model: Permission.FeaturePermission,
                through: {
                    attributes: []
                },
                attributes: ['ten_chuc_nang']
            }],
            attributes: ['ma_quyen', 'ten_quyen']
        })
        //hien thi du lieu: cach 1
        //neu khong lay it nhat 1 attributes tu PermissionModel thi no se khong the format duoc
        // const formattedResult = {
        //     ma_quyen: result.ma_quyen,
        //     ten_quyen: result.ten_quyen,
        //     ten_chuc_nang: result.FeaturePermissions.map(fp => fp.ten_chuc_nang)
        // };
        // res.json(formattedResult);
        
        //hien thi du lieu: cach 2
        res.json(result)
    } catch (error) {
        console.log("ERROR")
        res.status(500).json({error: 'Loi khi lay chuc nang'})
    }
};