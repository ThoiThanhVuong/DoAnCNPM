const Permission = require("../models/permissionModel");
const Employee = require("../models/EmployeeModel");

exports.showAllPermission = async (req, res) => {
  try {
    const permission = await Employee.findAll({
      include: [
        {
          model: Permission.Permission,
          include: [
            {
              model: Permission.FeaturePermission,
              through: {
                attributes: [],
              },
              attributes: [],
            },
          ],
          attributes: ["ma_quyen", "ten_quyen"],
        },
      ],
      attributes: ["ma_nv", "ten_nv", "email"],
    });
    const formattedResult = permission.map((item) => ({
      ma_nv: item.ma_nv,
      ten_nv: item.ten_nv,
      email: item.email,
      ma_quyen: item.Permission.ma_quyen,
      ten_quyen: item.Permission.ten_quyen,
    }));
    res.json(formattedResult);
    // res.json(permission);
  } catch (error) {
    res.status(500).json({ error: "co loi khi tim", error });
  }
};

exports.updateRole = async (req, res) => {
  const { ma_nv } = req.params;
  const { ma_quyen } = req.body;
  try {
    const employee = await Employee.findByPk(ma_nv);
    if (!employee) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
    }
    // console.log(employee)
    employee.ma_quyen = ma_quyen;
    await employee.save();
    console.log(ma_nv, ma_quyen);
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "loi khi update vai tro cua nhan vien" });
  }
};