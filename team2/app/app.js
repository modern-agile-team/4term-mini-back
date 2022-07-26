"use strict";

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static(`${__dirname}/src/views`));
app.use(express.urlencoded({ extended: true }));

// const post = require("./src/apis/post");
// const comment = require("./src/apis/comment");

// app.use("/moae/post", post);
// app.use("/moae/comment", comment);

module.exports = app;
