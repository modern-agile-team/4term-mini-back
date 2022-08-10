"use strict";

const Posts = require("../../models/service/Post/Post");

const output = {
  home: (req, res) => {
    logger.info("GET / 200 홈 화면");
    res.render("post");
  },
};

const process = {
  createPost: async (req, res) => {
    try {
      console.log("dasfklsadasfjk");
      const post = new Posts(req);
      const response = await post.createPost(req);

      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  createImage: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.createImage(req);

      return res.status(201).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.updatePost();

      return res.status(201).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.deletePost(req);

      return res.status(201).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  findAllByPosts: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.findAllByPosts();

      return res.status(201).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  findOneByPost: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.findOneByPost(req);

      return res.status(201).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  userMainPost: async (req, res) => {
    try {
      const post = new Posts(req);
      const response = await post.userMainPost(req);

      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },
};

module.exports = { process, output };
