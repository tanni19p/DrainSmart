const pool = require("../db");
const { calculateRisk } = require("../services/risk.service");

exports.getWards = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        name,
        risk_level,
        ST_AsGeoJSON(geom) AS geometry
      FROM wards;
    `);

    const enriched = rows.map(w => ({
      ...w,
      geometry: JSON.parse(w.geometry),
      ...calculateRisk(w)
    }));

    res.json(enriched);
  } catch (err) {
    console.error("Error fetching wards:", err);
    res.status(500).json({ error: "Failed to fetch wards" });
  }
};

