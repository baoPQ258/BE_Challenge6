import validator from "validator";

const validateRegisterInput = (data) => {
  const errors = {};
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  } else if (!/(?=.*[A-Z])/.test(data.password)) {
    errors.password = "Password must include at least one uppercase letter";
  } else if (!/(?=.*[a-z])/.test(data.password)) {
    errors.password = "Password must include at least one lowercase letter";
  } else if (!/(?=.*\d)/.test(data.password)) {
    errors.password = "Password must include at least one number";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
};

export default validateRegisterInput;
