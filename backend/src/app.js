const express = require("express");
const cors = require("cors");
const wardRoutes = require("./routes/ward.routes");
const hotspotRoutes = require("./routes/hotspot.routes");
const alertRoutes = require("./routes/alert.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/wards", wardRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/hotspots", hotspotRoutes);

app.use("/api/alerts", alertRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

module.exports = app;
