const express = require("express");
const router = express.Router();

const {
  getHotspots,
  getNearbyHotspots,
  getHotspotSummary
} = require("../controllers/hotspot.controller");

router.get("/summary", getHotspotSummary);
router.get("/nearby", getNearbyHotspots);
router.get("/", getHotspots);

module.exports = router;
