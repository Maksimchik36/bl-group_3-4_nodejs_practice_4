const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const RoleModel = require("../models/roleModel");

class AuthController {
  //1. валідуємо обовязкові поля з моделі
  //2. шукаємо користувача в БД по еmail
  //3. якщо знаходимо то користувач є і пропонуємо залогінитись
  //4. якщо не знаходимо то, хешуємо пароль
  //5. зберігаємо користувача в базу даних
  //6. скриваємо пароль для виводу.
  register = asyncHandler(async (req, res) => {
    const { userPassword, userEmail } = req.body;
    if (!userPassword || !userEmail) {
      throw new Error("User name and email is required.");
    }
    const candidate = await UserModel.findOne({ userEmail });
    if (candidate) {
      throw new Error("User already exist, please login.");
    }
    const hashPassword = bcrypt.hashSync(userPassword, 10);
    if (!hashPassword) {
      throw new Error("Unable to hash password.");
    }
    const userRole = await RoleModel.findOne({ value: "ADMIN" });
    const user = await UserModel.create({
      ...req.body,
      userPassword: hashPassword,
      roles: [userRole.value],
    });
    if (!user) {
      throw new Error("Unable to save user in to DB.");
    }
    user.userPassword = "secret";
    res.status(201).json({ code: 201, status: "Success", data: user });
  });

  login = asyncHandler(async (req, res) => {
    const { userPassword, userEmail } = req.body;
    if (!userPassword || !userEmail) {
      throw new Error("User name and email is required.");
    }

    const user = await UserModel.findOne({ userEmail });
    const validPassword = bcrypt.compareSync(userPassword, user.userPassword);

    if (!user || !validPassword) {
      throw new Error("Invalid login or password.");
    }
    user.token = this.generateToken(user._id, user.roles);
    await user.save();

    if (!user.token) {
      throw new Error("Unable to save token.");
    }
    res.status(200).json({ code: 200, status: "Success", data: user });
  });

  logout = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("Unable to logout.");
    }
    user.token = null;
    await user.save();
    res
      .status(200)
      .json({ code: 200, status: "Success", message: "Logout success!" });
  });

  info = asyncHandler(async (req, res) => {
    res.send("Access granded you are ADMIN");
  });

  generateToken = (id, roles) => {
    const payload = { id, roles };
    return JWT.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "8h" });
  };
}

module.exports = new AuthController();
