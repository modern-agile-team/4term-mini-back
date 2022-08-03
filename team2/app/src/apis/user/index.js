"use strict";

const express = require("express");
const router = express.Router();

const userCtrl = require("./user.Ctrl");
const checkToken = require("../../middlewares/identify-auth");

router.post("/register", userCtrl.process.register); // 회원가입

router.get("/profile/:userNo", checkToken.check.token, userCtrl.process.getUserInfo); //유저 정보 가져오기
router.patch("/profile/:userNo", checkToken.check.token, userCtrl.process.updateUserInfo); //유저 정보 수정

router.delete("/delete/:userNo", checkToken.check.token, userCtrl.process.deleteUser); //회원 탈퇴

module.exports = router;
