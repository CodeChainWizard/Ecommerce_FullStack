const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User is already stored" });
      }

      if (password.length < 6) {
        return res.status(400).json({ message: "Password grather than 6" });
      }

      // password bcryption
      const paswordHash = await bcrypt.hash(password, 10);

      const newuser = new Users({ name, email, password: paswordHash });

      await newuser.save();

      // jwt auth
      const accessToken = createAccessToken({ id: newuser._id });
      const refreshToken = createRefreshToken({ id: newuser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      res.json({
        accessToken,
        refreshToken,
        user: {
          _id: newuser._id,
          name: newuser.name,
          email: newuser.email,
        },
      });
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: "User Failed", details: error.message });
    }
  },

  // update to handle the case where refresh token is not sent
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.body.refreshToken;

      if (!rf_token) {
        return res.status(400).json({ message: "Please login or Register" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Please Login or Registerqqq" });
        }
        const accessToken = createAccessToken({ id: user.id });

        res.json({ user, accessToken });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userCtrl;
