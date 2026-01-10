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
      SELECT
        LOWER(risk_level) AS level,
        COUNT(*)::int AS count
      FROM hotspots
      GROUP BY risk_level;
    `);

    const summary = { low: 0, medium: 0, high: 0 };

    rows.forEach(r => {
      if (summary[r.level] !== undefined) {
        summary[r.level] = r.count;
      }
    });

    res.json(summary);
  } catch (error) {
    console.error("Error fetching hotspot summary:", error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};

module.exports = {
  getHotspots,
  getNearbyHotspots,
  getHotspotSummary
};
