"use strict";

const UserStorage = require("./userStorage"),
    Jwt = require("../Auth/auth"),
    checkToken = require("../../../../middleware/login-auth").checkUserToken;

const jwt = new Jwt();

class User {
    constructor(req) {
        this.req = req;

        this.params = req.params;
        this.body = req.body;
        this.headers = req.headers;
    }

    async searchUser() {
        const params = this.params;

        try {
            const data = await UserStorage.getUserbyNickname(params.nickname);

            if (!data) {
                return { success: false, msg: "유저 정보가 없습니다" };
            }
            return { success: true, msg: `회원검색 성공` };
        } catch (err) {
            throw err;
        }
    }

    async checkUser() {
        const client = this.body,
            token = this.headers.token || "";

        try {
            const userData = await UserStorage.getUserbyEmail(client.email);
            if (!token.length) {
                if (userData) {
                    return userData.email === client.email
                        ? { success: true, msg: "로그인 성공", token: jwt.newToken(userData) }
                        : { success: false, msg: "로그인 실패 : email불일치" };
                }
                return { success: false, msg: "최초 회원가입으로 이동" };
            }
            return checkToken(token);
        } catch (err) {
            throw err;
        }
    }

    async register() {
        const client = this.body;

        try {
            const nicknameCheck = (await UserStorage.getUserbyEmail(client.email)) || "";
            if (nicknameCheck.nickname === client.nickname) {
                return { success: false, msg: "닉네임 중복" };
            }

            const data = await UserStorage.saveUser(client);
            if (!data) {
                return { success: false, msg: "회원가입 실패" };
            }

            const dataForToken = await UserStorage.getUserbyEmail(client.email),
                newToken = jwt.newToken(dataForToken);

            return {
                success: true,
                msg: `회원가입 성공`,
                token: newToken,
            };
        } catch (err) {
            throw err;
        }
    }

    async delUser() {
        const params = this.params,
            token = this.headers.token;

        try {
            const tokenData = jwt.verifyToken(token);

            if (tokenData.no === Number(params.userNo)) {
                const data = await UserStorage.delUser(params.userNo);

                if (data) {
                    return { success: true, msg: `회원탈퇴 성공` };
                }
                return { success: false, msg: "회원탈퇴 실패" };
            }
        } catch (err) {
            throw err;
        }
    }

    async updateUser() {
        const client = this.body,
            params = this.params,
            token = this.headers.token;

        try {
            const tokenData = jwt.verifyToken(token);

            if (tokenData.no === Number(params.userNo)) {
                const values = [...Object.values(client), params.userNo],
                    updateData = await UserStorage.updateUser(values);

                if (!updateData) {
                    return { success: false, msg: "정보가 잘못됬습니다" };
                }

                const userData = await UserStorage.getUserbyNo(params.userNo),
                    newToken = jwt.newToken(userData);

                return {
                    success: true,
                    msg: `${client.nickname}의 정보수정 성공`,
                    token: newToken,
                };
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;
