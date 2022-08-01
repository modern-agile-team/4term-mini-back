"use strict";
const User = require("../../models/service/User/User");

const process = {
  register: async (req, res) => {
    //회원가입, 로그인
    const user = new User(req.body);
    const response = await user.register();

    return res.json(response);
  },
};

module.exports = {
  process,
};
