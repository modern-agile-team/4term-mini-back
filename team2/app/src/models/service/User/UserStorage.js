"use strict";

const db = require("../../../config/database");

class UserStorage {
  static async conflict({ email }) {
    //회원 중복 확인 email 사용 회원이면 바로 true 반환
    try {
      const query = "SELECT email FROM user WHERE email = (?);";
      const isCheck = await db.query(query, email);
      console.log(isCheck);
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

  static async register(client) {
    //회원 가입 name, email, profile, gender
    try {
      console.log(client);
      const { nickname, profile_image_url, email, gender } = client;
      const query = `INSERT INTO user(name, email, profile_image, gender) VALUES(?, ?, ?, ?);`;
      const test = await db.query(query, [nickname, email, profile_image_url, gender]);

      return test[0].affectedRows;
      // }
    } catch (err) {
      throw {
        msg: `${err}: 회원가입 에러입니다.`,
      };
    }
  }

  static async updateUserInfo(client, userNo) {
    //유저정보 업데이트
    try {
      const { nickname, name, website, phone, gender, profile_image } = client;
      const query = `UPDATE user SET nickname = ?, name = ?, website = ?, phone = ?, gender = ?, profile_image = ? where no = ?;`;
      const updateUserInfo = await db.query(query, [
        nickname,
        name,
        website,
        phone,
        gender,
        profile_image,
        userNo,
      ]);

      return updateUserInfo;
    } catch (err) {
      throw {
        msg: `${err}: 유저 정보 업데이트 오류입니다..`,
      };
    }
  }
}

module.exports = UserStorage;
