const Users = require("../models/userModel");

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      _id: req.user.id,
    });

    if (user.role === 0)
      return res.status(400).json({ message: "Admin Resources Access Denied" });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authAdmin;
