import Sequelize from "sequelize";
import db from "../db/database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    checkPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

//hashing password
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(
    user.password,
    await bcrypt.genSalt(10)
  );
  user.password = hashedPassword;
  user.checkPassword = hashedPassword;
});

//compare passwords
User.prototype.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
//token
User.prototype.createJWT = function () {
  return jwt.sign({ userId: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

await User.sync({ alter: true });

export default User;
