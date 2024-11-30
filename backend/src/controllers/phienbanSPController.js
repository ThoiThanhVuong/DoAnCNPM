const { Sequelize } = require('sequelize');
const {PhienBanSPModel} = require("../models/Relationship")

exports.getAllPBSP = async(req, res) => {
    try{
        const phienbanSP = await PhienBanSPModel.findAll({
            where: {
                trang_thai: 1
            }
        })
        res.json(phienbanSP)
    }
    catch(err){
        res.status(500).json({message: ' Tải danh sách phiên bản sản phẩm lỗi ', error: err.message});
    }
}
// exports.createPBSP = async (req, res) => {
//     const {ma_sp,ma_ram,ma_rom,ma_mau,gia_nhap,gia_xuat,ton_kho,trang_thai=1} =req.body;
//     try {
//         const newPBSP = await PhienBanSPModel.create({
//             ma_sp:ma_sp,
//             ma_ram:ma_ram,
//             ma_rom:ma_rom,
//             ma_mau:ma_mau,
//             gia_nhap:gia_nhap,
//             gia_xuat:gia_xuat,
//             ton_kho:ton_kho,
//             trang_thai:trang_thai,
//         });
//         if(!newPBSP){
//             res.status(404).json({message: 'thêm không thành công'})
//         }
//         res.json({message: 'Thêm Phiên bản sản phẩm thành công'})
//     } catch (error) {
//         res.status(500).json({message: ' Lỗi khi thêm phiên bản sản phẩm ', error: err.message});
//     }
// };
exports.updatedSL = async(req, res) => {
    const {ma_phien_ban_sp} = req.params;
    const {so_luong_moi} = req.body;
    try{
        const pbsp = await PhienBanSPModel.findByPk(ma_phien_ban_sp);
        if(!pbsp)
            return res.status(404).json({ message: 'Sản phẩm không tồn tại!' });
        const newSL = pbsp.ton_kho + so_luong_moi;
        pbsp.ton_kho = newSL;
        await pbsp.save();
        res.status(200).json({ message: 'Cập nhật số lượng tồn kho thành công'});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật số lượng tồn kho!' });
    }
}