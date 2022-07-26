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

  static async addNewPost({ userNo, content }) {
    try {
      const query = `INSERT INTO posts(user_no, content) VALUES(${userNo}, "${content}");`;
      const response = await db.query(query);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async addImages(images, postNo) {
    try {
      let query = "";
      images.forEach((imageUrl, index) => {
        query += `INSERT INTO images(image_url,post_no,order_no) VALUES("${imageUrl}",${postNo},${
          index + 1
        });`;
      });
      const response = await db.query(query);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async updatePost({ postNo, content }) {
    try {
      const qurey =
        "UPDATE posts SET content = ?, updated_date = NOW() WHERE no = ?;";
      const response = await db.query(qurey, [content, postNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  static async getOnePost(postNo) {
    try {
      const query = `SELECT posts.content, 
          IF(posts.created_date && posts.updated_date, posts.updated_date, posts.created_date) AS date,
          GROUP_CONCAT(images.image_url) AS images 
          FROM posts LEFT JOIN images ON images.post_no = posts.no 
          WHERE posts.no = ?
          GROUP BY posts.no;`;
      const response = await db.query(query, [postNo]);

      return response[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }
}

module.exports = PostStorage;
