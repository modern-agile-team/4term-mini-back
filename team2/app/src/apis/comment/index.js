"use strict";

const express = require("express");
const router = express.Router();
const commentCtrl = require("./comment.Ctrl");
const checkToken = require("../../middlewares/identify-auth");
// checkToken.check.token

router.post("/", commentCtrl.process.createComment);

// router.post("/", checkToken.check.token, commentCtrl.process.createComment);
// router.patch("/:userNo", checkToken.check.token, commentCtrl.process.updateComment);
router.get("/:postNo", commentCtrl.process.readComments);
// router.delete("/", checkToken.check.token, commentCtrl.process.deleteComment);
router.delete("/", commentCtrl.process.deleteComment);

module.exports = router;
