"use strict";

const express = require("express");
const router = express.Router();
const postCtrl = require("./post.Ctrl");
const { uploadPostImages } = require("../../models/service/Aws/Aws");
const checkToken = require("../../middlewares/identify-auth");

router.post(
  "/",
  checkToken.check.token,
  uploadPostImages.array("images", 9),
  postCtrl.hc.createPost
);
router.patch("/:userNo", checkToken.check.token, postCtrl.hc.updatePost);
router.get("/", postCtrl.hc.readAllPosts);

router.get("/:postNo", postCtrl.hc.readPost);
router.delete("/", checkToken.check.token, postCtrl.hc.deletePost);

router.get("/profile/:userNo", postCtrl.hc.readMainPosts);
module.exports = router;
