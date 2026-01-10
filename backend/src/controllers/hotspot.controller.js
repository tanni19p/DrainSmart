const pool = require("../db");

const getHotspots = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        name,
        risk_level,
        ST_Y(geom::geometry) AS lat,
        ST_X(geom::geometry) AS lng
      FROM hotspots;
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching hotspots:", error);
    res.status(500).json({ error: "Failed to fetch hotspots" });
  }
};

const getNearbyHotspots = async (req, res) => {
  const { lat, lng, radius = 2000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({
      error: "lat and lng query params are required"
    });
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT
        id,
        name,
        risk_level,
        ST_Y(geom::geometry) AS lat,
        ST_X(geom::geometry) AS lng
      FROM hotspots
      WHERE ST_DWithin(
        geom::geography,
        ST_MakePoint($1, $2)::geography,
        $3
      );
      `,
      [lng, lat, radius]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching nearby hotspots:", error);
    res.status(500).json({ error: "Failed to fetch nearby hotspots" });
  }
};

const getHotspotSummary = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT risk_level, COUNT(*)::int AS count
      FROM hotspots
      GROUP BY risk_level;
    `);

    const summary = { low: 0, medium: 0, high: 0 };

    rows.forEach(r => {
      if (r.risk_level === 1) summary.low += r.count;
      if (r.risk_level === 2) summary.medium += r.count;
      if (r.risk_level === 3) summary.high += r.count;
    });

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};


module.exports = {
  getHotspots,
  getNearbyHotspots,
  getHotspotSummary
};
