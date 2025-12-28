const users = require("../data/users");
const { generateToken } = require("../utils/jwt");

exports.login = (req, res) => {
  const { email } = req.body;

  const user = users.find(u => u.email === email);


  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    token,
    role: user.role
  });
};

