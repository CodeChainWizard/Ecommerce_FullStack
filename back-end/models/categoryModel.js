const mongooes = require("mongoose");

const categorySchema = new mongooes.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooes.model("Category", categorySchema);
