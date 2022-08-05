"use strict";

const express = require("express");
const commentCtrl = require("./comment.Ctrl");

const router = express.Router();

// //댓글 생성
// router.post("/", commentCtrl.process.createComment);

// //댓글 수정
// router.patch("/moae/comment", commentCtrl.process.updateComment);

// //댓글 조회
// router.get("/moae/comment/:postNo", commentCtrl.process.readComment);

//댓글 삭제
router.delete("/moae/comment/:commentNo", commentCtrl.process.deleteComment);

module.exports = router;
