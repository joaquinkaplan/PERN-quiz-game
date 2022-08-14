import CustomError from "../error.js";
import User from "../models/User.js";

const uniqueEmailAndNickname = async (req, res, next) => {
  const { email, nickname } = req.body;
  if (await User.findOne({ where: { email: email } })) {
    next(new CustomError("Not unique Email"));
  }
  if (await User.findOne({ where: { nickname: nickname } })) {
    next(new CustomError("Not unique Nickname"));
  }
  next();
};

export default uniqueEmailAndNickname;
