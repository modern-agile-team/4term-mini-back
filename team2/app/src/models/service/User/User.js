"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async register() {
    //회원가입
    const client = this.body;
    try {
      const test = await UserStorage.conflict(client);

      if (!test.success) {
        const userInfo = await UserStorage.register(client);
        if (!userInfo) {
          return { success: false, msg: "회원가입 실패" };
        }
        return { success: true, msg: "회원가입 성공" };
      }
      return test;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
