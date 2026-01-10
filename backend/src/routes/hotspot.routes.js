const express = require("express");
const router = express.Router();

const {
  getHotspots,
  getNearbyHotspots,
  getHotspotSummary
} = require("../controllers/hotspot.controller");

router.get("/", getHotspots);
router.get("/nearby", getNearbyHotspots);
router.get("/summary", getHotspotSummary);

module.exports = router;
