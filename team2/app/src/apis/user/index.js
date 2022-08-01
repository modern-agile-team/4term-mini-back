"use strict";

const express = require("express");
const router = express.Router();

const userCtrl = require("./user.Ctrl");

router.post("/register", userCtrl.process.register); // 회원가입
router.patch("/profile/:userNo", userCtrl.process.updateUserInfo); //유저 정보 수정

module.exports = router;
