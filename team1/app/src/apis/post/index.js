"use strict";

const express = require("express");
const postCtrl = require("./post.Ctrl");
const { upload } = require("../../../src/models/service/Aws/Aws");

const router = express.Router();

//게시글 생성
router.post("/", upload.array("images", 9), postCtrl.process.createPost);
// router.post("/", postCtrl.process.createPost);

//게시글 수정
router.patch("/:userNo", postCtrl.process.updatePost);

//게시글 삭제
router.delete("/:postNo", postCtrl.process.deletePost);

//게시글 전체 불러오기
router.get("/", postCtrl.process.findAllByPosts);

//게시글 상세 조회
router.get("/:postNo", postCtrl.process.findOneByPost);

//게시글 썸네일
router.get("/profile/:userNo", postCtrl.process.userMainPost);

module.exports = router;
