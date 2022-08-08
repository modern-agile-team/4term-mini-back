"use strict";

const UserStorage = require("./userStorage"),
    Jwt = require("../Auth/auth"),
    checkToken = require("../../../../middleware/login-auth").checkUserToken,
    S3 = require("../../../../middleware/s3");

const jwt = new Jwt();
const s3 = new S3();

class User {
    constructor(req) {
        this.req = req;
        this.file = req.file;
        this.params = req.params;
        this.body = req.body;
        this.headers = req.headers;
    }

    async searchUser() {
        const params = this.params;

        try {
            const data = await UserStorage.getUserbyNickname(params.nickname);
            console.log(data);

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
            console.log(userData);

            if (!token.length) {
                // 토큰 없을 시
                if (userData) {
                    // DB에 데이터 없을 시
                    return userData.email === client.email
                        ? {
                              success: true,
                              msg: "로그인 성공",
                              token: jwt.newToken(userData),
                              userExistence: true,
                          }
                        : {
                              success: false,
                              msg: "로그인 실패 : email불일치",
                          };
                }
                return { success: true, msg: "최초 회원가입으로 이동", userExistence: false };
                // DB에 데이터 있을 시 -> 회원가입 :)
            }
            return checkToken(token);
            // 토큰 있을 시
        } catch (err) {
            throw err;
        }
    }

    async register() {
        const client = this.body;
        const image = this.file.location;

        try {
            const nicknameCheck = (await UserStorage.getUserbyEmail(client.email)) || "";

            // 닉네임 중복체크
            if (nicknameCheck.nickname === client.nickname) {
                return { success: false, msg: "닉네임 중복" };
            }

            client.profile_image = image;
            console.log(client);

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
                console.log(userData);

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

    async test_updateUser() {
        // const client = this.body,
        //     params = this.params;
        // try {
        //     const profile = await UserStorage.getUserbyNo(params.userNo);
        //     for (const el in profile) {
        //         client[el] === profile[el] ? delete client[el] : "";
        //     }
        //     if (!Object.keys(client).length)
        //         return { success: false, msg: "수정된 정보가 없습니다" };
        //     const values = [...Object.values(client), Number(params.userNo)],
        //         queryKeys = Object.keys(client).reduce((acc, cur, idx, arr) => {
        //             return idx === arr.length - 1 ? acc + cur + "=?" : acc + cur + "=?,";
        //         }, "");
        //     const data = await UserStorage.test_updateUser(queryKeys, values);
        //     if (!data) {
        //         return { success: false, msg: "정보가 잘못됬습니다" };
        //     }
        //     return {
        //         success: true,
        //         msg: `${client.nickname}의 정보수정 성공`,
        //     };
        // } catch (err) {
        //     throw err;
        // }
    }

    //------------------------------------------image--------------------------------------------------

    async imageTest() {
        // const params = this.params;
        const image = this.file;

        try {
            console.log("image : ", image);
            const data = await UserStorage.imageTest_postsTable(image);

            if (data) {
                return { success: true, msg: `이미지 성공`, data: data };
            }
            return { success: false, msg: "이미지 실패", data: data };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;
