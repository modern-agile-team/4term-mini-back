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

  static async readComments(postNo) {
    try {
      const query = `SELECT comments.no AS commentNo, comments.user_no AS userNo, 
          IF(comments.created_date && comments.updated_date, comments.updated_date, comments.created_date) AS date,
           comments.content , users.profile_image AS profileImage, users.nickname
           FROM comments LEFT JOIN users ON comments.user_no = users.no WHERE comments.post_no = ?`;
      const response = await db.query(query, [postNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async removeComment({ commentNo }) {
    try {
      const query = "DELETE FROM comments WHERE no =?;";
      const response = await db.query(query, [commentNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }
}
module.exports = CommentStorage;
