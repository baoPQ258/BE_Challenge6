
import validateRegisterInput from "../services/registerValidation.js";

const registerValidationMiddleware = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  next();
};

export { registerValidationMiddleware };
