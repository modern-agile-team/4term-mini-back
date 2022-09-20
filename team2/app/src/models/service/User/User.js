"use strict";

const UserStorage = require("./UserStorage");
const Auth = require("../Auth/Auth");

class User {
  constructor(req) {
    this.params = req.params;
    this.body = req.body;
    this.file = req.file;
    this.decoded = req.decoded;
  }

  async register() {
    //회원가입
    const client = this.body;

    try {
      const checkUser = await UserStorage.checkUser(client); //유저 email 확인

      if (!checkUser.success) {
        // 유저가 없다면

        const userInfo = await UserStorage.register(client); //회원가입

        client.no = userInfo; //userNo 추가
        const token = await Auth.createJWT(client); // 리턴받은 유저정보로 토큰 생성

        return {
          success: true,
          msg: "회원가입 성공",
          token,
          userExistence: false,
        };
      }
      const token = await Auth.createJWT(checkUser.userInfo); // 유저가 있다면 받은 정보로 토큰 생성

      return {
        success: true,
        msg: "로그인 성공",
        token,
        userExistence: true,
      };
    } catch (err) {
      throw err;
    }
  }
  async getUserInfo() {
    const decoded = this.decoded;
    const { userNo } = this.params;

    try {
      const userInfo = await UserStorage.getUserInfo(userNo);
      // if (decoded.userNo == userNo) {
      //   //요청한 유저의 토큰안에 있는 userNO와 경로 userNo를 비교하여 일치할때 삭제 가능
      //   const userInfo = await UserStorage.getUserInfo(userNo);
      //   return { success: true, userInfo: userInfo[0][0] };
      // } else {
      //   const otherUserInfo = await UserStorage.getUserInfo(userNo);
      //   return { success: false, info: otherUserInfo[0][0] };
      // }
      return decoded.userNo == userNo
        ? { success: true, userInfo: userInfo[0][0], user: true } // true면 본인
        : { success: true, userinfo: userInfo[0][0], user: false };
    } catch (err) {
      throw err;
    }
  }

  async getUserProfileImg() {
    const { userNo } = this.params;
    try {
      const userProfile = await UserStorage.getUserProfileImg(userNo);

      return !userProfile[0][0].profile_image
        ? { isProfileImg: false }
        : { isProfileImg: true, profileImg: userProfile[0][0].profile_image };
    } catch (err) {
      throw {
        msg: `${err} 유저 정보를 찾을 수 없습니다. (User)`,
      };
    }
  }

  async updateUserInfo() {
    //유저정보 업데이트
    const { userNo } = this.params;
    const client = this.body;
    const img = this.file;
    const decoded = this.decoded;

    try {
      // img === undefined ? (client.profile_image = null) : (client.profile_image = img.location);
      // 닉네임 수정 -> 유저가 맞는지 체크, 닉네임이 중복되는지 -> 중복되면 그사람이 다른 사람인지
      client.profile_image = !img ? null : img.location;
      if (!client.nickname) return { success: false, msg: "닉네임은 공백이 될 수 없습니다." };
      if (decoded.userNo == userNo) {
        //요청한 유저의 토큰안에 있는 userNO와 경로 userNo를 비교하여 일치할때 수정 가능
        const duplicatedUser = await UserStorage.duplicatedUser(client, userNo);
        if (duplicatedUser[0][0]) {
          return { success: false, msg: "닉네임 중복" };
        }
        const updateUserInfo = await UserStorage.updateUserInfo(client, userNo);
        if (updateUserInfo[0].affectedRows) {
          return { success: true, msg: "회원정보 수정 완료" };
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async searchUser() {
    const nickname = this.params;

    try {
      const searchUser = await UserStorage.searchUser(nickname);
      if (searchUser) {
        return { seucess: true, user: searchUser[0] };
      }
      return { success: false, msg: "유저 검색 오류입니다." };
    } catch (err) {
      throw err;
    }
  }

  async deleteUser() {
    const decoded = this.decoded;
    const { userNo } = this.params;

    try {
      if (decoded.userNo == userNo) {
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
