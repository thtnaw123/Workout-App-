const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

userSchema.static.signUp = async function signUp(email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use!");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({ email, password: hash });

  return user;
};

module.exports = new mongoose.model("UserModel", userSchema);
