const { Sequelize } = require('sequelize');
const pbSP = require("../models/Relationship")

exports.getAllPBSP = async(req, res) => {
    try{
        const phienbanSP = await pbSP.PhienBanSPModel.findAll()
        res.json(phienbanSP)
    }
    catch(err){
        res.status(500).json({message: ' Tải danh sách phiên bản sản phẩm lỗi ', error: err.message});
    }
}