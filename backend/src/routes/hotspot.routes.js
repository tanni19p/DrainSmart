const express = require("express");
const router = express.Router();
const { getHotspots, getNearbyHotspots } = require("../controllers/hotspot.controller");

router.get("/", getHotspots);
router.get("/nearby", getNearbyHotspots);

module.exports = router;
