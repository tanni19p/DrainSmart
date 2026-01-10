const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const pool = require("./db.js");
const wardRoutes = require("./routes/ward.routes");
const hotspotRoutes = require("./routes/hotspot.routes");
const alertRoutes = require("./routes/alert.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/wards", wardRoutes);
app.use("/api/hotspots", hotspotRoutes);
app.use("/api/alerts", alertRoutes);

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, ST_AsText(geom) FROM hotspots;"
    );
    res.json({
      connected: true,
      rows: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      connected: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

module.exports = app;

