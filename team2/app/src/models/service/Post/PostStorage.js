"use strict";

const db = require("../../../config/database");

class PostStorage {
  static async readAllPosts() {
    try {
      const query = `SELECT posts.no AS postNo, posts.user_no AS userNo, users.nickname, users.profile_image AS profileImage,posts.content,  
      IF(posts.created_date && posts.updated_date, posts.updated_date, posts.created_date) AS date,
      GROUP_CONCAT(images.image_url)  AS images  
      FROM posts
      LEFT JOIN images ON images.post_no = posts.no
      LEFT JOIN users ON posts.user_no = users.no
      GROUP BY posts.no;`;
      const response = await db.query(query);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }
}

module.exports = PostStorage;
