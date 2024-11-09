const { Op } = require('sequelize');
const {KhachHang,PhieuXuat,sequelize} =require('../models/index');
const getThongKeKhachHang = async (req, res) => {
    const { text, timeStart, timeEnd } = req.query;
    try {
      const results = await KhachHang.findAll({
        attributes: ['ma_kh', 'ten_kh', 
          [sequelize.fn('COUNT', sequelize.col('phieuXuats.ma_px')), 'SoLuong'],
          [sequelize.fn('SUM', sequelize.col('phieuXuats.tong_tien')), 'total']
        ],
        include: [{
          model: PhieuXuat,
          as: 'phieuXuats',
          attributes: [],
          where: {
            thoi_gian_xuat: { [Op.between]: [new Date(timeStart), new Date(timeEnd)] }
          }
        }],
        where: {
          [Op.or]: [
            { ten_kh: { [Op.like]: `%${text}%` } },
            { ma_kh: { [Op.like]: `%${text}%` } }
          ]
        },
        group: ['customer.ma_kh', 'customer.ten_kh']
      });
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching customer statistics' });
    }
  };

module.exports = { getThongKeKhachHang };