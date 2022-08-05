"use strict";

const { json } = require("express");
const Comment = require("../../models/services/comment/comment");
const Comments = require("../../models/services/comment/comment");
const { connectComment } = require("../../models/services/comment/commentStorage");

const process = {
  //   createComment: async (req, res) => {
  //     try {
  //       const comment = new Comments(req);
  //       const response = await comment.createComment(req);

  //       return res.status(201).json(response);
  //     } catch (err) {
  //       throw res.status(500).json(err);
  //     }
  //   },

  updateComment: async (req, res) => {
    try {
      const comment = new Comments(req);
      const response = await comment.updateComment(req);

      return res.status(201).json(response);
    } catch (err) {
      throw res.status(500).json(err);
    }
  },

  //   readComment: async (req, res) => {
  //     try {
  //       const comment = new Comments(req);
  //       const response = await comment.readComment(req);

  //       return res.status(200).json(response);
  //     } catch (err) {
  //       throw res.status(500).json(err);
  //     }
  //   },

  //   deleteComment: async (req, res) => {
  //     try {
  //       const comment = new Comments(req);
  //       const response = await comment.deleteComment(req);

  //       return res.status(200).json(response);
  //     } catch (err) {
  //       throw res.status(500).json(err);
  //     }
  //   },
};
module.exports = { process };
