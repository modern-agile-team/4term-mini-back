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
};

module.exports = {
  process,
};
