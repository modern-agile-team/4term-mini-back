"use strict";

const db = require("../../../config/database");

class UserStorage {
  static async conflict({ email }) {
    //회원 중복 확인 email 사용 회원이면 바로 true 반환
    try {
      const query = "SELECT email FROM user WHERE email = (?);";
      const isCheck = await db.query(query, email);
      if (isCheck[0].length === 0) {
        return { success: false, msg: "회원이 아닙니다." };
      }
      if (isCheck[0][0].email === email) {
        return { success: true, msg: "로그인 완료" };
      } else {
        return { success: true, msg: "회원가입 완료" };
      }
    } catch (err) {
      throw {
        msg: `${err}: 로그인 에러`,
      };
    }
  }
}

module.exports = UserStorage;
