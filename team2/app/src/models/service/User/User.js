"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
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

  async updateUserInfo() {
    //유저정보 업데이트
    const { userNo } = this.params;
    const client = this.body;
    try {
      const updateUserInfo = await UserStorage.updateUserInfo(client, userNo);

      if (updateUserInfo[0].affectedRows) {
        return { success: true, msg: "회원정보 수정 완료" };
      }
      return { success: false, msg: "회원정보 수정 실패" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
