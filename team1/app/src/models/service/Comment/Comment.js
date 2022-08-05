"use strict";

const express = require("express");
const { param } = require("../../../apis/comment");
const CommentStorage = require("./CommentStorage");

class comment {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  //   async createComment() {
  //     try {
  //       const { postNo, userNo } = this.query;
  //       const { content } = this.body;
  //       const comments = await CommentStorage.createComment(postNo, userNo, content);
  //       return { commentNo: comments.insertId };
  //     } catch (err) {
  //       throw { success: false, msg: err.msg };
  //     }
  //   }
  //   async updateComment() {
  //     try {
  //       const body = this.body;
  //       const { affectedRows } = await CommentStorage.updateComment(body);
  //       if (!affectedRows) {
  //         return { success: false, msg: "댓글 수정 실패" };
  //       }

  //       return { success: true, msg: "댓글이 수정되었습니다" };
  //     } catch (err) {
  //       throw { success: false, msg: err.msg };
  //     }
  //   }
  //   async readComment() {
  //     try {
  //       const param = this.params;
  //       const comment = await CommentStorage.readComment(param);
  //       if (!comment.length) return { success: false, msg: "없는 게시판입니다." };
  //       return comment;
  //     } catch (err) {
  //       throw { success: false, msg: err.msg };
  //     }
  //   }
  async deleteComment() {
    try {
      const param = this.params;
      const comment = await CommentStorage.deleteComment(param);

      if (!comment.affectedRows) return { success: false, msg: "없는 댓글입니다." };

      return { success: true, msg: "댓글이 삭제 되었습니다" };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}
module.exports = comment;
