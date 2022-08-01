"use strict";
const User = require("../../models/service/User/User");

const process = {
  register: async (req, res) => {
    //회원가입, 로그인
    const user = new User(req);
    const response = await user.register();

    return res.json(response);
  },

  updateUserInfo: async (req, res) => {
    // 유저 정보 수정
    const user = new User(req);
    const response = await user.updateUserInfo();

    return res.json(response);
  },
};

module.exports = {
  process,
};
