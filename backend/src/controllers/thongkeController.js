const { Op } = require('sequelize');
const {KhachHang,PhieuXuat,Provider,importModel,sequelize} =require('../models/Relationship');
const getThongKeKhachHang = async (req, res) => {
    const { text, timeStart, timeEnd } = req.query;
    try {
      const whereConditions={
        [Op.or]: [
          { ten_kh: { [Op.like]: `%${text || ''}%`  } },
          { ma_kh: { [Op.like]: `%${text || ''}%` } }
        ]
      };
      const phieuXuatConditions ={};
      if(timeStart && timeEnd){
        phieuXuatConditions.thoi_gian_xuat = {
          [Op.between]: [new Date(timeStart), new Date(timeEnd)]
        };
      }
      const results = await KhachHang.findAll({
        attributes: ['ma_kh', 'ten_kh', 
          [sequelize.fn('COUNT', sequelize.col('phieuXuats.ma_px')), 'SoLuong'],
          [sequelize.fn('SUM', sequelize.col('phieuXuats.tong_tien')), 'total']
        ],
        include: [{
          model: PhieuXuat,
          as: 'phieuXuats',
          attributes: [],
          where: phieuXuatConditions,  
        }],
        where:whereConditions,
        group: ['customer.ma_kh', 'customer.ten_kh']
      });
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching customer statistics' });
    }
  };

  const getThongKeProvider = async (req,res) =>{
    const { text, timeStart, timeEnd } = req.query;
    try{
      const whereCondition={
        [Op.or]:[
          {ten_ncc: {[Op.like] : `%${text || ''}%`}},
          {ma_ncc: {[Op.like] : `%${text || ''}%`}}
        ]
      };
      const phieuNhapCondition ={};
      if(timeStart && timeEnd){
        phieuNhapCondition.thoi_gian_nhap={
          [Op.between] : [new Date(timeStart), new Date(timeEnd)]
        };
      }
      const results = await Provider.findAll({
        attributes: ['ma_ncc', 'ten_ncc', 
          [sequelize.fn('COUNT', sequelize.col('phieuNhaps.ma_pn')), 'SoLuong'],
          [sequelize.fn('SUM', sequelize.col('phieuNhaps.tong_tien')), 'total']
        ],
        include: [{
          model: importModel,
          as: 'phieuNhaps',
          attributes: [],
          where: phieuNhapCondition,  
        }],
        where:whereCondition,
        group: ['provider.ma_ncc', 'provider.ten_ncc']
      });
      res.json(results);
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Error fetching provider statistics' });
    }
  }
module.exports = { getThongKeKhachHang ,getThongKeProvider};