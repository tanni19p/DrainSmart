const express = require("express");
const router = express.Router();
const { getWards } = require("../controllers/ward.controller");

router.get("/", getWards);

module.exports = router;
