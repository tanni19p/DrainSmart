const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, "utf-8");
  return data ? JSON.parse(data) : [];
};


const saveUsers = (users) =>
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

// SIGNUP
exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (!["admin", "citizen"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const users = getUsers();
  const exists = users.find(u => u.email === email);

  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    email,
    password: hashedPassword,
    role
  };

  users.push(user);
  saveUsers(users);

  const token = generateToken(user);
  res.json({ token, role });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.json({ token, role: user.role });
};
