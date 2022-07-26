"use strict";

const PostStorage = require("./PostStorage");

class Post {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.query = req.query;
  }

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
}

module.exports = Post;
