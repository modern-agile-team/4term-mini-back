"use strict";

const express = require("express");
const router = express.Router();
const commentCtrl = require("./comment.Ctrl");

router.post("/", commentCtrl.process.createComment);
router.patch("/", commentCtrl.process.updateComment);
// router.get("/:postNo", commentCtrl.process.readComments);
// router.delete("/:commentNo", commentCtrl.process.deleteComment);

module.exports = router;
