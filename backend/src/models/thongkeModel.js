const db = require('../config/db');
const { DataTypes } = require('sequelize');
 module.exports ={
    getThongKeKhachHang : async (text,timeStart,timeEnd) =>{
        timeEnd.setHours(23,59,0,0);
        try{
            const [result] = await sequelize.query(
                `
                with kh as(
                    SELECT kh.ma_kh,kh.ten_kh,COUNT(phieu_xuat.ma_px) AS "tongsophieu",SUM(phieu_xuat.tong_tien) AS "tongtien"
                    FROM khach_hang kh
                    JOIN phieu_xuat ON phieu_xuat.ma_kh =kh.ma_kh
                    WHERE phieu_xuat.thoi_gian_xuat BETWEEN ? AND ?
                    GROUP BY kh.ma_kh,kh.ten_kh;  
                )
                SELECT ma_kh ,ten_kh,COALESCE(kh.tongsophieu,0) as SoLuong, Coalesce(kh.tongtien,0) as total
                FROM kh 
                WHERE ten_kh LIKE ? OR ma_kh LIKE ?;
                `,
                {
                   replacements:[timeStart, timeEnd,`%${text}%`,`%${text}%`],
                   type: sequelize.QueryTypes.SELECT
                }
            );
            return result;
        } catch (erro){
            throw new Error(erro.message);
        }
    }
 }