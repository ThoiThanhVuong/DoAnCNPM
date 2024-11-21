const db = require("../config/db");
const { DataTypes } = require("sequelize");
// const productModel =require('./ProductModel')
// const RamModel = require('./RamModel');
// const RomModel = require('./RomModel');
// const ColorModel = require('./ColorModel');
const models = require('./Relationship')
const PhienBanSPModel =db.define( 
    "PhienBanSPModel",{
        ma_phien_ban_sp:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        ma_sp:{
            type:DataTypes.INTEGER,
            references:{
                model: models.ProductModel,
                key:'ma_sp'
            }
        },
        ma_ram:{
            type:DataTypes.INTEGER,
            references:{
                model:models.Ram,
                key:'ma_ram'
            }
        },
        ma_rom:{
            type:DataTypes.INTEGER,
            references:{
                model:models.Rom,
                key:'ma_rom'
            }
        },
        ma_mau:{
            type:DataTypes.INTEGER,
            references:{
                model:models.Color,
                key:'ma_mau'
            }
        },
        gia_nhap:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        gia_xuat:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        ton_kho:{
            type:DataTypes.INTEGER,
            allowNull:true
        },

    },{
        tableName:'phien_ban_san_pham',
        timestamps:false,
    }
)
module.exports = PhienBanSPModel;