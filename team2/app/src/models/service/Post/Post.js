"use strict";

const PostStorage = require("./PostStorage");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
    this.files = req.files;
    this.decoded = req.decoded;
  }

  response = {
    userNoError: { success: false, msg: "유저 정보 불일치" },
    postNotFoundError: { success: false, msg: "존재하지 않는 포스트입니다." },
  };

  async readAllPosts() {
    try {
      const allPostsResult = await PostStorage.readAllPosts();

      return allPostsResult.reduce((allPostsInfo, postInfo) => {
        postInfo.images = postInfo.images.split(",");
        allPostsInfo.push(postInfo);
        return allPostsInfo;
      }, []);
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async addPost() {
    try {
      if (this.decoded.userNo != this.body.userNo) {
        return this.response.userNoError;
      }
      console.log(this.body.files);
      if (this.files.length === 0) {
        return { success: false, msg: "이미지를 추가해 주세요" };
      }
      const { affectedRows, insertId } = await PostStorage.addNewPost(this.body);
      if (insertId && affectedRows) {
        const images = this.files.reduce((images, fileInfo) => {
          images.push(fileInfo.location);
          return images;
        }, []);
        const addImageResult = await PostStorage.addImages(images, insertId);
        console.log(addImageResult);
        if (this.files.length === 1) {
          return addImageResult.affectedRows
            ? {
                success: true,
                postNo: insertId,
                msg: "게시물이 추가되었습니다.",
              }
            : { success: false, msg: "이미지 업로드를 실패했습니다." };
        }
        addImageResult.forEach((result) => {
          if (!result.affectedRows) {
            return { success: false, msg: "이미지 업로드를 실패했습니다." };
          }
        });
        return {
          success: true,
          msg: "게시물 업로드를 성공했습니다.",
        };
      }
      return {
        success: false,
        msg: "게시물 업로드를 실패했습니다",
      };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async updatePost() {
    try {
      if (this.decoded.userNo != this.params.userNo) {
        return this.response.userNoError;
      }
      console.log(this.body);
      const postExistence = await PostStorage.getOnePost(this.body.postNo);
      console.log(postExistence);
      if (postExistence.length === 0) {
        return this.response.postNotFoundError;
      }
      const updateResult = await PostStorage.updatePost(this.body);

      return updateResult.affectedRows
        ? { success: true, msg: "게시물이 수정되었습니다." }
        : { success: false, msg: "게시물이 수정되지 않았습니다" };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async readOnePost() {
    try {
      let particularPost = await PostStorage.getOnePost(this.params.postNo);
      if (particularPost.length === 0) {
        return this.response.postNotFoundError;
      }
      particularPost[0].images = particularPost[0].images.split(",");

      return particularPost[0];
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async deletePost() {
    try {
      if (this.decoded.userNo != this.query.userNo) {
        return this.response.userNoError;
      }
      const postExistence = await PostStorage.getOnePost(this.query.postNo);
      if (postExistence.length === 0) {
        return this.response.postNotFoundError;
      }

      const deleteResult = await PostStorage.deletePost(this.query.postNo);

      return deleteResult.affectedRows
        ? { success: true, msg: "게시물이 삭제되었습니다." }
        : { success: false, msg: "게시물이 삭제되지 않았습니다" };
    } catch (err) {
      throw { success: false, msg: err.msg };
    }
  }

  async readProfilePosts() {
    try {
      const profilePostInfo = await PostStorage.getProfilePosts(this.params.userNo);

      return profilePostInfo;
    } catch (err) {
      return { success: false, msg: err.msg };
    }
  }
}

module.exports = Post;
