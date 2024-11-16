const { Op, literal } = require('sequelize');
const {
  KhachHang,PhieuXuat,Provider,
  importModel,PhienBanSPModel,
  chiTietPhieuXuatModel,detailImport,
  Ram,Rom,Color,
  ProductModel,
  sequelize} =require('../models/Relationship');

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
  const getThongKeTonKho = async (req, res) => {
    const { text, timeStart, timeEnd } = req.query;
    try {
      // Điều kiện tìm kiếm theo text
      const TextCondition = text
        ? {
            [Op.or]: [
              { '$product.ten_sp$': { [Op.like]: `%${text || ''}%` } },
              { '$product.ma_sp$': { [Op.like]: `%${text || ''}%` } },
            ],
          }
        : {};
  
      // Điều kiện tìm kiếm theo thời gian
      const timeConditionNhap = timeStart && timeEnd 
        ? `AND phieu_nhap.thoi_gian_nhap BETWEEN '${timeStart}' AND '${timeEnd}'` 
        : '';
      const timeConditionXuat = timeStart && timeEnd 
        ? `AND phieu_xuat.thoi_gian_xuat BETWEEN '${timeStart}' AND '${timeEnd}'` 
        : '';
  
      const results = await PhienBanSPModel.findAll({
        attributes: [
          "ma_sp",
          "ma_phien_ban_sp",
          // Số lượng đầu kỳ
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM(nhapDau.so_luong), 0) - COALESCE(SUM(xuatDau.so_luong), 0)
              FROM chi_tiet_phieu_nhap AS nhapDau
              INNER JOIN phieu_nhap AS phieuNhap  ON nhapDau.ma_pn = phieuNhap.ma_pn
              LEFT JOIN chi_tiet_phieu_xuat AS xuatDau  
              ON nhapDau.ma_phien_ban_sp = xuatDau.ma_phien_ban_sp
              WHERE nhapDau.ma_phien_ban_sp = PhienBanSPModel.ma_phien_ban_sp
              AND phieuNhap.thoi_gian_nhap < '${timeStart || '1900-01-01'}'
            )`), "so_luong_dau_ky"
          ],
          // Số lượng nhập trong kỳ
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM(so_luong), 0)
              FROM chi_tiet_phieu_nhap
              INNER JOIN phieu_nhap 
              ON phieu_nhap.ma_pn = chi_tiet_phieu_nhap.ma_pn
              WHERE chi_tiet_phieu_nhap.ma_phien_ban_sp = PhienBanSPModel.ma_phien_ban_sp
              ${timeConditionNhap}
            )`), "so_luong_nhap"
          ],
          // Số lượng xuất trong kỳ
          [
            sequelize.literal(`(
              SELECT COALESCE(SUM(so_luong), 0)
              FROM chi_tiet_phieu_xuat
              INNER JOIN phieu_xuat 
              ON phieu_xuat.ma_px = chi_tiet_phieu_xuat.ma_px
              WHERE chi_tiet_phieu_xuat.ma_phien_ban_sp = PhienBanSPModel.ma_phien_ban_sp
              ${timeConditionXuat}
            )`), "so_luong_xuat"
          ],
          // Số lượng cuối kỳ
          [
            sequelize.literal(`(
              (SELECT COALESCE(SUM(nhapDau.so_luong), 0) - COALESCE(SUM(xuatDau.so_luong), 0)
               FROM chi_tiet_phieu_nhap AS nhapDau
               INNER JOIN phieu_nhap AS phieuNhap  ON nhapDau.ma_pn = phieuNhap.ma_pn
               LEFT JOIN chi_tiet_phieu_xuat AS xuatDau
               ON nhapDau.ma_phien_ban_sp = xuatDau.ma_phien_ban_sp
               WHERE nhapDau.ma_phien_ban_sp = PhienBanSPModel.ma_phien_ban_sp
               AND phieuNhap.thoi_gian_nhap < '${timeStart || '1900-01-01'}')
              +
              (SELECT COALESCE(SUM(so_luong), 0)
               FROM chi_tiet_phieu_nhap
               INNER JOIN phieu_nhap 
               ON phieu_nhap.ma_pn = chi_tiet_phieu_nhap.ma_pn
               WHERE chi_tiet_phieu_nhap.ma_phien_ban_sp = PhienBanSPModel.ma_phien_ban_sp
               ${timeConditionNhap})
              -
              (SELECT COALESCE(SUM(so_luong), 0)
               FROM chi_tiet_phieu_xuat
               INNER JOIN phieu_xuat 
               ON phieu_xuat.ma_px = chi_tiet_phieu_xuat.ma_px
               WHERE chi_tiet_phieu_xuat.ma_phien_ban_sp = PhienBanSPModel.ma_phien_ban_sp
               ${timeConditionXuat})
            )`), "so_luong_cuoi_ky"
          ],
          [sequelize.col("product.ten_sp"), "ten_sp"],
          "ram.kich_thuoc_ram",
          "rom.kich_thuoc_rom",
          "mauSac.ten_mau"
        ],
        where: TextCondition,
        include: [
          { model: ProductModel, as: 'product', attributes: [] },
          { model: Ram, as: "ram", attributes: ["kich_thuoc_ram"] },
          { model: Rom, as: "rom", attributes: ["kich_thuoc_rom"] },
          { model: Color, as: "mauSac", attributes: ["ten_mau"] },
        ],
        order: [["ma_sp", "ASC"]],
      });
  
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching inventory statistics' });
    }
  };
  
  
module.exports = { getThongKeKhachHang ,getThongKeProvider,getThongKeTonKho};