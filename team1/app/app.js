"use strict";

const express = require("express"),
    dotenv = require("dotenv");
// 환경변수 관리 라이브러리

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views");
app.set("view engine", "ejs");

// API 경로 설정
// const profile = require("./src/apis/profile");
const home = require("./src/apis/profile");
const user = require("./src/apis/user");

// API 연결
app.use("/", home);

// app.use("/moae/main", profile);
app.use("/moae/user", user);

module.exports = app;
