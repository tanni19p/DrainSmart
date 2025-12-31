const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "drainsmart_secret";

const generateToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
      role: user.role
    },
    SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = { generateToken };

