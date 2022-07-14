"use strict";

const express = require("express");
const router = express.Router();

const userCtrl = require("./user.Ctrl");

router.post("/", userCtrl.process.register);

module.exports = router;
