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

  async updateComment() {
    try {
      const response = await CommentStorage.updateComment(this.body);
      if (response.affectedRows === 1) {
        return {
          success: true,
          msg: "댓글이 수정되었습니다",
        };
      } else {
        return {
          success: false,
          msg: "댓글이 수정되지 않았습니다",
        };
      }
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async getComments() {
    try {
      const commentsInfo = await CommentStorage.readComments(
        this.params.postNo
      );

      return commentsInfo;
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async deleteComment() {
    try {
      const response = await CommentStorage.removeComment(this.params);
      if (response.affectedRows === 1) {
        return {
          success: true,
          msg: "댓글이 삭제되었습니다",
        };
      } else {
        return {
          success: false,
          msg: "댓글이 삭제되지 않았습니다",
        };
      }
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Comment;
