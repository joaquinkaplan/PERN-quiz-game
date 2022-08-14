import Score from "../models/Score.js";
import { StatusCodes } from "http-status-codes";
import CustomError from "../error.js";
const addScore = async (req, res) => {
  try {
    const { nickname, score } = req.body;
    const newScore = await Score.create({ nickname, score });
    res.status(StatusCodes.CREATED).json({
      newScore,
    });
  } catch (e) {
    throw new CustomError(e);
  }
};

const lastScore = async (req, res) => {
  const { id: nickname } = req.params;
  const latestScore = await Score.findOne({
    where: { nickname },
    order: [["createdAt", "DESC"]],
  });
  console.log(latestScore);
  res.status(StatusCodes.OK).json({ latestScore });
};

const highScore = async (req, res) => {
  const { id: nickname } = req.params;
  const latestScore = await Score.findOne({
    where: { nickname },
    order: [["score", "DESC"]],
  });
  res.status(StatusCodes.OK).json({ latestScore });
};

export default { addScore, lastScore, highScore };
