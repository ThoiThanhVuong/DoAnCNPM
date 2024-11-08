const thongke =require('../models/thongkeModel');
module.exports = {
    getThongKeKhachHang : async (req,res) =>{
        const {text,timeStart,timeEnd} = req.query;
        try{
            const thongkeKH =await thongke.getThongKeKhachHang(text,new Date(timeStart),new Date(timeEnd));
            res.json(thongkeKH);
        }catch(error){
            console.log(error);
            res.status(500).json({message:'Internal server error'});
        }
    }
}