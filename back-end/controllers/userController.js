const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_KEY, { expiresIn: "30min" });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("all fields must be filled");
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("invalid password");
    }
    const token = createToken(user._id);

    res.status(200).json({ email, token, userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("all fields must be filled.");
    }
    const exists = await UserModel.findOne({ email });

    if (exists) {
      throw Error("Email already in use!");
    }

    const validationResult = signUpValidation({ email, password });

    if (validationResult.error) {
      throw Error(validationResult.error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await UserModel.create({ email, password: hash });
    // const res = await UserModel.signUp(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signUpValidation = (Inp) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,}$")).required(),
  });
  return schema.validate(Inp);
};
module.exports = { userLogin, userSignup };
