const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
