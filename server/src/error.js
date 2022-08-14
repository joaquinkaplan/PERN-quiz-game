class CustomError extends Error {
  constructor(message) {
    super(message);
    console.error(message);
  }
}
export default CustomError;
