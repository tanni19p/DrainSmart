const express = require("express");
const router = express.Router();
const { getHotspots } = require("../controllers/hotspot.controller");

router.get("/", getHotspots);

module.exports = router;
