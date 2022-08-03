"use strict";

const UserStorage = require("./UserStorage");
const Auth = require("../Auth/Auth");

class User {
  constructor(req) {
    this.headers = req.headers;
    this.params = req.params;
    this.body = req.body;
  }

  async register() {
    //회원가입
    const client = this.body;
    try {
      const response = await UserStorage.conflict(client); //유저 정보가 있는지 확인

      if (!response.success) {
        // 유저가 없다면
        const userInfo = await UserStorage.register(client); //회원가입
        const conflict = await UserStorage.conflict(client); //유저 정보 확인
        const token = await Auth.createJWT(conflict.userInfo); // 리턴받은 유저정보로 토큰 생성

        if (!userInfo) {
          return { success: false, msg: "회원가입 실패" };
        }
        return { success: true, msg: "회원가입 성공", token };
      }

      const token = await Auth.createJWT(response.userInfo); // 유저가 있다면 받은 정보로 토큰 생성

      return { success: true, msg: "로그인 성공", token };
    } catch (err) {
      throw err;
    }
  }
  async getUserInfo() {
    const token = this.headers;
    const { userNo } = this.params;

    try {
      const checkToken = await Auth.verifyJWT(token);
      if (checkToken.userNo == userNo) {
        //요청한 유저의 토큰안에 있는 userNO와 경로 userNo를 비교하여 일치할때 삭제 가능
        const userInfo = await UserStorage.getUserInfo(userNo);
        return { success: true, userInfo: userInfo[0][0] };
      } else {
        const otherUserInfo = await UserStorage.getUserInfo(userNo);

        return { success: false, info: otherUserInfo[0][0] };
      }
    } catch (err) {
      throw err;
    }
  }

  async updateUserInfo() {
    //유저정보 업데이트
    const token = this.headers;
    const { userNo } = this.params;
    const client = this.body;

    try {
      const checkToken = await Auth.verifyJWT(token);
      if (checkToken.userNo == userNo) {
        //요청한 유저의 토큰안에 있는 userNO와 경로 userNo를 비교하여 일치할때 수정 가능
        const updateUserInfo = await UserStorage.updateUserInfo(client, userNo);

        if (updateUserInfo[0].affectedRows) {
          return { success: true, msg: "회원정보 수정 완료" };
        }
      } else {
        return { success: false, msg: "회원정보 수정 실패" };
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteUser() {
    const token = this.headers;
    const { userNo } = this.params;

    try {
      const checkToken = await Auth.verifyJWT(token);
      if (checkToken.userNo == userNo) {
        //요청한 유저의 토큰안에 있는 userNO와 경로 userNo를 비교하여  맞을 때 삭제 가능
        const deleteUser = await UserStorage.deleteUser(userNo);
        if (deleteUser.affectedRows) {
          return { success: true, msg: "회원탈퇴 완료" };
        } else {
          return { success: false, msg: "이미 탈퇴처리된 회원 입니다." };
        }
      } else {
        return { success: false, msg: "유저정보가 다릅니다." };
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
