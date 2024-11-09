const Permission = require("../models/permissionModel");

exports.showAllPermission = async (req, res) => {
  try {
    const permission = await Permission.Employees.findAll({
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
          attributes: ["ten_quyen"],
        },
      ],
      attributes: ["ma_nv", "ten_nv", "email"],
    });
    const formattedResult = permission.map((item) => ({
      ma_nv: item.ma_nv,
      ten_nv: item.ten_nv,
      email: item.email,
      ten_quyen: item.Permission.ten_quyen,
    }));
    res.json(formattedResult);
    // res.json(permission);
  } catch (error) {
    res.status(500).json({ error: "co loi khi tim", error });
  }
};
