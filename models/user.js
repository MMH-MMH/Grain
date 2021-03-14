const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new schema(
  {
    name: String,
    email: String,
    password: String,
    state: String,
    level: String,
  },
  {
    timestamp: {
      createdAt: "createdAt",
      upadateAt: "upadateAt",
    },
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;

module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("hashing failed", error);
  }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("comparing failed", error);
  }
};
