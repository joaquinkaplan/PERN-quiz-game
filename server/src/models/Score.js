import Sequelize from "sequelize";
import db from "../db/database.js";

const Score = db.define(
  "Score",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    // userId: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    nickname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    score: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
);

await Score.sync({ alter: true });

export default Score;
