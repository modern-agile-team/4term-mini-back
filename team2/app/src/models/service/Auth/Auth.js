"use strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

class Auth {
  static async createJWT(user) {
    const payload = {
      userNo: user.no,
      nickname: user.nickname,
      profile: user.profile_image,
    };
    return jwt.sign(payload, SECRET_KEY, {
      algorithm: "HS256",
      expiresIn: "10m",
      issuer: "modern agile",
    });
  }
  static async verifyJWT(token) {
    try {
      const verifyToken = jwt.verify(token.authorization, SECRET_KEY);
      return verifyToken;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Auth;
