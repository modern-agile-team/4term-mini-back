"use strict";

const express = require("express");
const router = express.Router();

const { upload, deleteProfile } = require("../../models/service/Aws/Aws");
const userCtrl = require("./user.Ctrl");
const checkToken = require("../../middlewares/identify-auth");

router.post("/login", userCtrl.process.register); // 회원가입
router.get("/profile/:userNo", checkToken.check.token, userCtrl.process.getUserInfo); //유저 정보 전체 조회
router.get("/search/:nickname", userCtrl.process.searchUser); // 유저 정보 일부 조회
router.patch(
  "/profile/:userNo",
  checkToken.check.token,
  deleteProfile,
  upload.single("profileImg"),
  userCtrl.process.updateUserInfo
); //유저 정보 수정
router.delete("/delete/:userNo", checkToken.check.token, userCtrl.process.deleteUser); //회원 탈퇴

module.exports = router;
