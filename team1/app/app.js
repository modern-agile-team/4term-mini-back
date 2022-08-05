"use strict";

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(express.static(`${__dirname}/src/views`));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

const post = require("./src/apis/post");
const comment = require("./src/apis/comment");
const user = require("./src/apis/user");

app.use("/moae/post", post);
app.use("/moae/comment", comment);
app.use("/moae/user", user);

module.exports = app;
