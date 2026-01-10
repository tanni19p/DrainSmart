const pool = require("../db");
const { calculateRisk } = require("../services/risk.service");

exports.getWardForLocation = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      error: "lat and lng are required"
    });
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT
        id,
        name,
        risk_level
      FROM wards
      WHERE ST_Contains(
        geom::geometry,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)
      )
      LIMIT 1;
      `,
      [lng, lat]
    );

    if (rows.length === 0) {
      return res.json(null);
    }

    const ward = rows[0];
    const risk = calculateRisk(ward);

    res.json({
      ...ward,
      ...risk
    });
  } catch (error) {
    console.error("Ward lookup failed:", error);
    res.status(500).json({ error: "Failed to lookup ward" });
  }
};
