const { Op } = require('sequelize');
const Customer = require('../models/CustomerModel');
const Invoice = require('../models/phieuXuatModel');
const getCustomerStatistics = async (req, res) => {
    const { text, timeStart, timeEnd } = req.query;
    try {
        const customers = await Customer.findAll({
            include: [{
                model: Invoice,
                required: false,
                where: {
                    thoi_gian_xuat: {
                        [Op.between]: [new Date(timeStart), new Date(timeEnd)],
                    },
                },
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('ma_px')), 'soluong'],
                    [sequelize.fn('SUM', sequelize.col('tong_tien')), 'total'],
                ],
            }],
            where: {
                [Op.or]: [
                    { ten_kh: { [Op.like]: `%${text}%` } },
                    { ma_kh: { [Op.like]: `%${text}%` } },
                ],
            },
        });

        const result = customers.map(customer => ({
            ma_kh: customer.ma_kh,
            ten_kh: customer.ten_kh,
            soluong: customer.Invoices[0]?.dataValues.soluong || 0,
            total: customer.Invoices[0]?.dataValues.total || 0,
        }));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = { getCustomerStatistics };