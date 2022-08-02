"use strict";

const express = require("express");
const router = express.Router();
const authUtil = require("../../../middleware/login-auth").checkIdxToken;

const userCtrl = require("./user.Ctrl");

router.get("/search/:nickname", authUtil, userCtrl.process.searchUser);

router.post("/login", userCtrl.process.login);
router.post("/register", userCtrl.process.register);
router.delete("/:userNo", authUtil, userCtrl.process.delUser);
router.patch("/profile/:userNo", authUtil, userCtrl.process.updateUser);

module.exports = router;
