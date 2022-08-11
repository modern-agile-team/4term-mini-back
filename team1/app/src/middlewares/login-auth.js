"use strict";

const Auth = require("../models/service/Auth/Auth");
const jwt = new Auth();

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkIdxToken: async (req, res, next) => {
        try {
            let token = req.headers.token;

            // 토큰 없음
            if (!token) {
                return res.json({ success: false, msg: "EMPTY_TOKEN : 토큰없음" });
            } else {
                const user = await jwt.verifyToken(token);

                // 유효기간 만료
                if (user === TOKEN_EXPIRED) {
                    return res.json({ success: false, msg: "EXPIRED_TOKEN : 토큰만료" });
                }
                // 유효하지 않는 토큰
                if (user === TOKEN_INVALID) {
                    return res.json({ success: false, msg: "INVALID_TOKEN : 유효하지 않은 토큰" });
                }
                if (user === undefined) {
                    return res.json({ success: false, msg: "INVALID_TOKEN : 유효하지 않은 토큰" });
                }
                if (!Object.keys(req.body).length) {
                    req.nickname = user.nickname;
                    req.profile = user.profile;
                }
            }

            next();
        } catch (err) {
            throw err;
        }
    },

    checkUserToken: async token => {
        try {
            const user = await jwt.verifyToken(token);

            // 유효기간 만료
            if (user === TOKEN_EXPIRED) {
                return { success: false, msg: `EXPIRED_TOKEN : 토큰만료 ` };
            }
            // 유효하지 않는 토큰
            if (user === TOKEN_INVALID) {
                return { success: false, msg: `INVALID_TOKEN : 유효하지 않은 토큰` };
            }
            if (user === undefined) {
                return { success: false, msg: `INVALID_TOKEN : 유효하지 않은 토큰` };
            }
            return { success: true, msg: `로그인 성공`, userno: user.no, userExistence: true };
        } catch (err) {
            throw err;
        }
    },
};

module.exports = authUtil;
