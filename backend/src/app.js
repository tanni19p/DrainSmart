const express = require("express");
const cors = require("cors");

const wardRoutes = require("./routes/ward.routes");
const hotspotRoutes = require("./routes/hotspot.routes");
const alertRoutes = require("./routes/alert.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({
  origin: [
  "http://localhost:5173",
  "https://drain-smart-n683.vercel.app/"
],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/wards", wardRoutes);
app.use("/api/hotspots", hotspotRoutes);
app.use("/api/alerts", alertRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

module.exports = app;

