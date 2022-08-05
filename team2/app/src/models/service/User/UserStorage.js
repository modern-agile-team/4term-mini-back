"use strict";

const db = require("../../../config/database");

class UserStorage {
  static async conflict({ email }) {
    //회원 중복 확인 email 사용 회원이면 바로 true 반환
    try {
      const query = `SELECT no, nickname, profile_image FROM user WHERE email = ?;`;
      const matchedUser = await db.query(query, email);
      if (matchedUser[0].length === 0) {
        return { success: false };
      }
      return { success: true, userInfo: matchedUser[0][0] };
    } catch (err) {
      throw {
        msg: `${err}: 로그인 에러`,
      };
    }
  }

  static async register(client) {
    //회원 가입 name, email, profile, gender
    try {
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

  static async getUserInfo(userNo) {
    try {
      const query = `SELECT * FROM user WHERE no = ?`;
      const userInfo = await db.query(query, userNo);

      return userInfo;
    } catch (err) {
      throw {
        msg: `${err}: 유저 정보를 찾을 수 없습니다.`,
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

  static async deleteUser(userNo) {
    //회원 탈퇴
    try {
      const query = `DELETE FROM user WHERE no = ?;`;
      const deleteUser = await db.query(query, userNo);
      return deleteUser[0];
    } catch (err) {
      throw {
        msg: `${err}: 회원탈퇴에 실패했습니다.`,
      };
    }
  }
}

module.exports = UserStorage;
