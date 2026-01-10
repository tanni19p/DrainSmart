const pool = require("../db");

exports.getSummary = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        risk_level,
        COUNT(*) AS count
      FROM hotspots
      GROUP BY risk_level;
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
