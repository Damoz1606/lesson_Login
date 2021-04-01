const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user_schema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  facebook: {
    email: String,
    password: String,
    id: String,
    token: String,
  },
  twitter: {
    email: String,
    password: String,
    id: String,
    token: String,
  },
  google: {
    email: String,
    password: String,
    id: String,
    token: String,
  },
});

user_schema.methods.generateHash = async (password) => {
  return await bcrypt.hashSync(password, await bcrypt.genSalt(8));
};

user_schema.methods.validate_password = async (password) => {
  return await bcrypt.compareSync(password, await this.local.password);
};

module.exports = mongoose.model("User", user_schema);
