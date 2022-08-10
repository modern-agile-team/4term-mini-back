"use strict";

const express = require("express");
const router = express.Router();
const commentCtrl = require("./comment.Ctrl");
const checkToken = require("../../middlewares/identify-auth");

router.post("/", checkToken.check.token, commentCtrl.process.createComment);
router.patch(
  "/:userNo",
  checkToken.check.token,
  commentCtrl.process.updateComment
);
router.get("/:postNo", commentCtrl.process.readComments);
router.delete("/", checkToken.check.token, commentCtrl.process.deleteComment);

module.exports = router;
