import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  let jwtSecretKey = process.env.JWT_SECRET;
  const stringUserId = userId.toString();
  let data = {
    time: Date(),
    userId: stringUserId,
  };

  const token = jwt.sign(data, jwtSecretKey, { expiresIn: "7d" });

  return token;
};

export default generateToken;
