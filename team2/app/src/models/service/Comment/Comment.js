"use strict";
const CommentStorage = require("./CommentStorage");
const PostStorage = require("../Post/PostStorage");

class Comment {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
    this.decoded = req.decoded;
  }

  response = {
    userNoError: { success: false, msg: "유저 정보 불일치" },
    notFoundError: { success: false, msg: "존재하지 않는 댓글입니다." },
    contentNullError: {
      success: false,
      msg: "댓글 내용을 추가해 주세요.",
    },
  };

  async addComment() {
    try {
      if (this.decoded.userNo != this.query.userNo) {
        return this.response.userNoError;
      }
      if (!this.body.content) {
        return this.response.contentNullError;
      }

      const response = await CommentStorage.addComment(
        this.query.postNo,
        this.query.userNo,
        this.body.content
      );

      return response.affectedRows === 1
        ? {
            success: true,
            commentNo: response.insertId,
            msg: "댓글이 작성되었습니다",
          }
        : {
            success: false,
            msg: "댓글이 작성되지 않았습니다",
          };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async updateComment() {
    try {
      if (this.decoded.userNo != this.params.userNo) {
        return this.response.userNoError;
      }
      const commentExistence = await CommentStorage.readOneComment(this.body);
      if (commentExistence.length === 0) {
        return this.response.notFoundError;
      }
      const response = await CommentStorage.updateComment(this.body);

      return response.affectedRows === 1
        ? { success: true, msg: "댓글이 수정되었습니다." }
        : {
            success: false,
            msg: "댓글이 수정되지 않았습니다.",
          };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async getComments() {
    try {
      const postExistence = await PostStorage.getOnePost(this.params.postNo);
      if (postExistence.length === 0) {
        return {
          success: false,
          msg: "존재하지 않는 포스트입니다",
        };
      }

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
      if (this.decoded.userNo != this.query.userNo) {
        return this.response.userNoError;
      }
      const commentExistence = await CommentStorage.readOneComment(this.query);
      if (commentExistence.length === 0) {
        return this.response.notFoundError;
      }

      const response = await CommentStorage.removeComment(this.query);
      return response.affectedRows === 1
        ? { success: true, msg: "댓글이 삭제되었습니다." }
        : {
            success: false,
            msg: "댓글이 삭제되지 않았습니다.",
          };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Comment;
