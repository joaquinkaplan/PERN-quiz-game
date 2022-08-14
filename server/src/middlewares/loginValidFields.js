import CustomError from "../error.js";

const loginValidFields = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new CustomError("Please provide all values"));
  }
  next();
};

export default loginValidFields;
