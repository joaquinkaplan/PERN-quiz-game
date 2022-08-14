import CustomError from "../error.js";

const validateInput = (req, res, next) => {
  const { firstName, lastName, nickname, email, password, checkPassword } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !nickname ||
    !email ||
    !password ||
    !checkPassword
  ) {
    next(new CustomError("Please provide all values"));
  }
  next();
};

export default validateInput;
