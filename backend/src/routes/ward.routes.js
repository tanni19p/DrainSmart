const express = require("express");
const router = express.Router();
const { getWardForLocation } = require("../controllers/ward.controller");

router.get("/lookup", getWardForLocation);

module.exports = router;
