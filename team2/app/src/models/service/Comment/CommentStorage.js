"use strict";

const db = require("../../../config/database");

class CommentStorage {
  static async addComment(postNo, userNo, content) {
    try {
      const query = `INSERT INTO comments(user_no, post_no, content) VALUES(?,?,?);`;
      const response = await db.query(query, [userNo, postNo, content]);
      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async updateComment({ commentNo, content }) {
    try {
      const query = `UPDATE comments SET content = ?, updated_date = NOW() WHERE no = ?`;
      const response = await db.query(query, [content, commentNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }
}
module.exports = CommentStorage;
