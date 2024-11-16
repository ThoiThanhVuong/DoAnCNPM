const Employee = require("../models/EmployeeModel");

exports.compareAccount = async (req, res) => {
  const { username, password } = req.body;
  try {
    const employee = await Employee.findOne({
      where: {
        ma_nv: username,
        mat_khau: password,
      },
    });
    if (!employee) {
      console.log("tai khoan khong hop le");
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "tai khoan khong hop le", error });
  }
};

exports.checkUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const employeeID = await Employee.findOne({
      where: {
        ma_nv: username,
      },
    });
    if (!employeeID) {
      console.log("ten tai khoan khong ton tai");
    }
    res.json(employeeID);
  } catch (error) {
    res.status(500).json({ error: "ten tai khoan khong hop le", error });
  }
};
