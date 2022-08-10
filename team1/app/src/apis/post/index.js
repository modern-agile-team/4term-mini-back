"use strict";

const express = require("express");
const postCtrl = require("./post.Ctrl");
const { upload } = require("../../../src/models/service/Aws/Aws");

const router = express.Router();

//게시글 생성
router.post("/moae/post/", upload.array("images", 9), postCtrl.process.createPost);

//게시글 수정
router.patch("/moae/post", postCtrl.process.updatePost);

//게시글 삭제
router.delete("/moae/post/:postNo", postCtrl.process.deletePost);

//게시글 전체 불러오기
router.get("/moae/post", postCtrl.process.findAllByPosts);

//게시글 상세 조회
router.get("/moae/post/:postNo", postCtrl.process.findOneByPost);

//게시글 썸네일
router.get("/moae/post/profile/:userNo", postCtrl.process.userMainPost);

module.exports = router;
