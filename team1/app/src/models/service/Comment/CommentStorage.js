"use strict";

const { param } = require("../../../apis/comment");
const db = require("../../../apis/config/mariadb");

class commentStorage {
  //   static async createComment(postNo, userNo, content) {
  //     try {
  //       const query = `insert into comments(post_no, user_no, content) values(?, ?, ?)`;
  //       const response = await db.query(query, [postNo, userNo, content]);
  //       return response[0];
  //     } catch (err) {
  //       throw { msg: `${err} : 댓글 생성 오류입니다` };
  //     }
  //   //   }
  //   static async updateComment({ commentNo, content }) {
  //     try {
  //       const query = `UPDATE comments SET content = ? WHERE no = ?;`;
  //       const response = await db.query(query, [content, commentNo]);
  //       return response[0];
  //     } catch (err) {
  //       throw { msg: `${err} : 댓글 수정 오류입니다` };
  //     }
  // }
  //   static async readComment({ postNo }) {
  //     try {
  //       const query = `SELECT comments.no, users.profile_image AS profileImage, users.nickname, comments.content, comments.created_date as DATE FROM comments
  //   			LEFT JOIN users
  //   			ON users.no = comments.user_no
  //   			LEFT JOIN posts
  //   			ON posts.no = comments.post_no
  //   			where posts.no = ?;`;
  //       const response = await db.query(query, [postNo]);
  //       return response[0];
  //     } catch (err) {
  //       throw { msg: `${err} : 댓글 불러오기 오류입니다.` };
  //     }
  //   }
  static async deleteComment({ commentNo }) {
    try {
      const query = `DELETE FROM comments WHERE no = ?; `;
      const response = await db.query(query, [commentNo]);
      return response[0];
    } catch (err) {
      throw { msg: `${err} : 댓글 삭제하기 오류입니다.` };
    }
  }
}
module.exports = commentStorage;
