"use strict";

const Comment = require("../../models/service/Comment/Comment");

const process = {
  createComment: async (req, res) => {
    try {
      const comment = new Comment(req);
      const response = await comment.addComment();

      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  updateComment: async (req, res) => {
    try {
      const comment = new Comment(req);
      const response = await comment.updateComment();

      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  readComments: async (req, res) => {
    try {
      const comment = new Comment(req);
      const response = await comment.getComments();
      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = new Comment(req);
      const response = await comment.deleteComment();

      return res.status(200).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },
};

module.exports = {
  process,
};
