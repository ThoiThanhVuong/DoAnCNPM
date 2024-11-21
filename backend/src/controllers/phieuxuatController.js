const { Sequelize } = require('sequelize');
const Export = require("../models/phieuXuatModel");

// lấy tất cả phiếu xuất
exports.getExports = async (req, res) => {
    try{
        const exports = await Export.findAll();
        res.json(exports);
    }
    catch(err){
        res.status(500).json({message: ' Tải danh sách phiếu xuất lỗi ', error: err.message});
    }
};

// lấy phiếu xuất theo Id
exports.getExportByID = async (req, res) => {
    const {ma_px} = req.params
    try{
        const ExportID = await Export.findByPk(ma_px);
        if(!ExportID)
        {
            res.status(404).json({message: 'Không tìm thấy phiếu xuất'})
        }
        res.json(ExportID)
    }
    catch(err){
        res.status(500).json({message: ' Tải phiếu xuất lỗi ', error: err.message});
    }
}


// Thêm hóa đơn
exports.addExport = async (req, res) => {
    const trang_thai = 1
    const { ma_nv, ma_kh, thoi_gian_xuat, tong_tien} = req.body
    try{
        const newExport = await Export.create({
            ma_nv,
            ma_kh,
            thoi_gian_xuat,
            tong_tien,
            trang_thai
        })
        if(!newExport)
            res.status(404).json({message: 'thêm không thành công'})
        res.json({message: 'Thêm phiếu xuất thành công'})
    }
    catch(err){
        res.status(500).json({message: ' Lỗi khi thêm nhân viên ', error: err.message});
    }
}