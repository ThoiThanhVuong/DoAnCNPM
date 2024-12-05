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