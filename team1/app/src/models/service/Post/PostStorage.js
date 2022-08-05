"use strict";
const { param } = require("../../../apis/board");
const db = require("../../../apis/config/mariadb");

class postStorage {
  static async findAllByPosts() {
    try {
      const query = `
      		select posts.no,posts.user_no, GROUP_CONCAT(images.image_url) AS images, posts.content, posts.updated_date, users.nickname
      		from posts
      		LEFT JOIN users
      		on users.no = posts.user_no
        	LEFT JOIN images
        	ON images.post_no = posts.no
      		GROUP BY posts.no;`;
      const posts = await db.query(query);
      return posts[0];
    } catch (err) {
      throw { success: false, msg: err };
    }
  }

  // static async findOneByPost(postNo) {
  //   try {
  //     const query = `
  //     		select posts.content, group_concat(images.image_url) AS images, IF(posts.updated_date IS NOT NULL, posts.updated_date, posts.created_date) AS date from posts
  //     		LEFT JOIN images
  //     		ON images.post_no = posts.no
  //     		where posts.no = ?
  //     		group by posts.no;`;
  //     const posts = await db.query(query, [postNo]);

  //     return posts[0];
  //   } catch (err) {
  //     throw { success: false, msg: err };
  //   }
  // }

  // static async createPost({ user_no, content }) {
  //   try {
  //     const query = `insert into posts(user_no, content) values(?, ?)`;
  //     const response = await db.query(query, [user_no, content]);
  //     return response;
  //   } catch (err) {
  //     throw {
  //       msg: `${err} : 게시글 생성 오류입니다, 서버 개발자에게 문의해주세요`,
  //     };
  //   }
  // }

  // static async createImage(post_no, image_url, order_no) {
  //   try {
  //     const query = `insert into images(post_no, image_url, order_no) values(?, ?, ?);`;
  //     const response = await db.query(query, [post_no, image_url, order_no]);
  //     return response;
  //   } catch (err) {
  //     throw {
  //       msg: `${err} : 이미지 생성 오류입니다, 서버 개발자에게 문의해주세요`,
  //     };
  //   }
  // }

  // static async updatePost({ no, content }) {
  //   try {
  //     const query = `update posts set content = ? where no = ?;`;
  //     const response = await db.query(query, [content, no]);
  //     return response;
  //   } catch (err) {
  //     throw {
  //       msg: `${err} : 게시글 수정 오류입니다, 서버 개발자에게 문의해주세요`,
  //     };
  //   }
  // }

  // static async deletePost({ postNo }) {
  //   try {
  //     const query = `delete from posts where no = ? `;
  //     const response = await db.query(query, [postNo]);
  //     return response;
  //   } catch (err) {
  //     throw {
  //       msg: `${err} : 게시글 삭제 오류입니다, 서버 개발자에게 문의해주세요`,
  //     };
  //   }
  // }

  // static async userMainPost({ userNo }) {
  //   try {
  //     const query = `select posts.no AS postNo, images.image_url AS images, if(posts.updated_date IS NOT NULL, posts.updated_date, posts.created_date) AS DATE
  //     		from posts
  //     		LEFT JOIN images
  //     		on images.post_no = posts.no
  //    		WHERE posts.user_no = ?
  //    		GROUP BY posts.no
  //    		ORDER BY DATE DESC;`;
  //     const userInfo = await db.query(query, [userNo]);
  //     return userInfo[0];
  //   } catch (err) {
  //     throw {
  //       msg: `${err} :게시글 썸네일 조회 오류입니다, 서버개발자에게 문의해주세요.`,
  //     };
  //   }
  // }
}

module.exports = postStorage;
