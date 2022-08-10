"use strict";

const express = require("express"),
    router = express.Router(),
    userCtrl = require("./user.Ctrl"),
    identityCheck = require("../../middlewares/login-auth").checkIdxToken;

// s3
const S3 = require("../../middlewares/s3"),
    s3 = new S3(),
    upload = s3.upload.single("profileImg");

router.get("/search/:nickname", identityCheck, userCtrl.process.searchUser);

router.post("/login", userCtrl.process.login);
router.post("/register", upload, userCtrl.process.register);
router.delete("/:userNo", identityCheck, s3.delete, userCtrl.process.delUser);
router.patch("/profile/:userNo", identityCheck, s3.delete, upload, userCtrl.process.updateUser);

module.exports = router;
