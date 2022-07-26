"use strict";
const CommentStorage = require("./CommentStorage");

class Comment {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  async addComment() {
    try {
      const response = await CommentStorage.addComment(
        this.query.postNo,
        this.query.userNo,
        this.body.content
      );

      if (response.affectedRows === 1) {
        return {
          success: true,
          commentNo: response.insertId,
          msg: "댓글이 작성되었습니다",
        };
      } else {
        return {
          success: false,
          msg: "댓글이 작성되지 않았습니다",
        };
      }
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Comment;
