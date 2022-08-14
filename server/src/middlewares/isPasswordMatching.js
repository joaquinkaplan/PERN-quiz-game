import CustomError from "../error.js";

const isPasswordMatching = (req, res, next) => {
  const { password, checkPassword } = req.body;
  if (password !== checkPassword) {
    next(new CustomError("Please provide matching passwords"));
  }
  next();
};

export default isPasswordMatching;
