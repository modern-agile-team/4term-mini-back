"use strict";

const Post = require("../../models/service/Post/Post");

const process = {
  readAllPosts: async (req, res) => {
    try {
      const post = new Post(req);
      const response = await post.readAllPosts();
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  createPost: async (req, res) => {
    try {
      const post = new Post(req);
      const response = await post.addPost();

      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      const post = new Post(req);
      const response = await post.updatePost();
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },
};

module.exports = {
  process,
};
