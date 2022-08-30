"use strict";

const db = require("../../../config/database");

class UserStorage {
  static async checkUser({ account_email }) {
    //회원 중복 확인 email 사용 회원이면 바로 true 반환
    try {
      const query = `SELECT no, nickname, profile_image FROM users WHERE email = ?;`;
      const matchedUser = await db.query(query, account_email);

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
      const { nickname, account_email, gender } = client;
      const query = `INSERT INTO users(name, email, gender) VALUES(?, ?, ?);`;
      const test = await db.query(query, [nickname, account_email, gender]);
      return test[0].insertId;
      // }
    } catch (err) {
      throw {
        msg: `${err}: 회원가입 에러입니다.`,
      };
    }
  }

  static async getUserInfo(userNo) {
    try {
      const query = `SELECT * FROM users WHERE no = ?`;
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
      const query = `UPDATE users SET nickname = ?, name = ?, website = ?, phone = ?, gender = ?, profile_image = ? where no = ?;`;
      const updateUserInfo = await db.query(query, [
        nickname,
        name,
        website,
        phone,
        gender,
        profile_image,
        userNo,
      ]);
      // const updateUserInfo = await db.query(query, [...Object.values(client), userNo]);
      return updateUserInfo;
    } catch (err) {
      throw {
        msg: `${err}: 유저 정보 업데이트 오류입니다..`,
      };
    }
  }

  static async searchUser({ nickname }) {
    //유저 닉네임 검색
    try {
      const query = `SELECT no, nickname, profile_image FROM users WHERE nickname LIKE "%"?"%"`;
      const searchUser = await db.query(query, [nickname]);

      return searchUser;
    } catch (err) {
      throw {
        msg: `${err}: 유저 검색 오류입니다..`,
      };
    }
  }

  static async duplicatedUser({ nickname }, userNo) {
    //중복 유저 닉네임 검색
    try {
      const query = `SELECT nickname, no FROM users WHERE nickname = ? AND no != ?`;
      const duplicatedUser = await db.query(query, [nickname, userNo]);

      return duplicatedUser;
    } catch (err) {
      throw {
        msg: `${err}: 유저 닉네임 중복입니다..`,
      };
    }
  }

  static async deleteUser(userNo) {
    //회원 탈퇴
    try {
      const query = `DELETE FROM users WHERE no = ?;`;
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
