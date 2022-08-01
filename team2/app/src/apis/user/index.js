"use strict";

const express = require("express");
const router = express.Router();

const userCtrl = require("./user.Ctrl");

router.post("/register", userCtrl.process.register); // 회원가입

module.exports = router;
