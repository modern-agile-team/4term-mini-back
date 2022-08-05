"use strict";

const express = require("express");
const { param } = require("../../../apis/board");
const PostStorage = require("./PostStorage");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

  // async findAllByPosts() {
  //   try {
  //     const posts = await PostStorage.findAllByPosts();
  //     for (let i = 0; i < posts.length; i++) {
  //       posts[i].images = posts[i].images.split(",");
  //     }
  //     return posts;
  //   } catch (err) {
  //     throw { success: false, msg: err.msg };
  //   }
  // }

  // async createPost() {
  //   try {
  //     const body = this.body;
  //     const createPost = await PostStorage.createPost(body);
  //     const createPostInfo = createPost[0];
  //     const image = body.image_url;

  //     if (!createPostInfo.affectedRows) {
  //       return { success: false, msg: "게시글 생성 오류" };
  //     }

  //     for (let i = 0; i < image.length; i++) {
  //       await PostStorage.createImage(createPostInfo.insertId, image[i], i);
  //     }

  //     return { success: true, msg: "게시글 생성" };
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async updatePost() {
  //   try {
  //     const body = this.body;
  //     const updatePost = await PostStorage.updatePost(body);
  //     if (!updatePost[0].affectedRows) return { success: false, msg: "게시글 수정 오류" };

  //     return { success: true, msg: "게시물이 수정되었습니다." };
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async deletePost() {
  //   try {
  //     const params = this.params;
  //     const deletePost = await PostStorage.deletePost(params);
  //     if (!deletePost[0].affectedRows) {
  //       return { success: false, msg: "게시글 삭제 오류" };
  //     }

  //     return { success: true, msg: "게시물이 삭제되었습니다." };
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // async findOneByPost() {
  //   try {
  //     const params = this.params;

  //     const findOneByPost = await PostStorage.findOneByPost(params.postNo);
  //     if (findOneByPost.length === 0) {
  //       return { success: false, msg: "존재하지 않는 게시글입니다" };
  //     }
  //     findOneByPost[0].images = findOneByPost[0].images.split(",");

  //     return findOneByPost[0];
  //   } catch (err) {
  //     throw { success: false, msg: err.msg };
  //   }
  // }

  async userMainPost() {
    try {
      const params = this.params;
      const userMainPost = await PostStorage.userMainPost(params);
      console.log(userMainPost);
      if (userMainPost.length === 0) {
        return { success: false, msg: err.msg };
      }
      return userMainPost;
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }
}

module.exports = Post;
