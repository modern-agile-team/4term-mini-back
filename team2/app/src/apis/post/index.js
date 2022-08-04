"use strict";

const express = require("express");
const router = express.Router();
const postCtrl = require("./post.Ctrl");
const { uploadPostImages } = require("../../models/service/Aws/Aws");

router.post("/", uploadPostImages.array("images", 9), postCtrl.process.createPost);
router.patch("/", postCtrl.process.updatePost);
router.get("/", postCtrl.process.readAllPosts); //전체 게시물 가져오기

router.get("/:postNo", postCtrl.process.readPost);
router.delete("/:postNo", postCtrl.process.deletePost);

router.get("/profile/:userNo", postCtrl.process.readMainPosts); //각 게시물의 첫번째 사진만 보내기

module.exports = router;
