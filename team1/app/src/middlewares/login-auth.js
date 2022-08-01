"use strict";

const Auth = require("../models/service/Auth/Auth");
const jwt = new Auth();

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authUtil = {
    checkIdxToken: async (req, res, next) => {
        try {
            let token = req.headers.token;

            if (!token) {
                return res.json({ success: false, msg: "EMPTY_TOKEN : 토큰없음" });
            } else {
                const user = await jwt.verifyToken(token);

                if (user === TOKEN_EXPIRED) {
                    return res.json({ success: false, msg: "EXPIRED_TOKEN : 토큰만료" });
                }

                if (user === TOKEN_INVALID) {
                    return res.json({ success: false, msg: "INVALID_TOKEN : 유효하지 않은 토큰" });
                }
                if (user === undefined) {
                    return res.json({ success: false, msg: "INVALID_TOKEN : 유효하지 않은 토큰" });
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

            if (user === TOKEN_EXPIRED) {
                return { success: false, msg: `EXPIRED_TOKEN : 토큰만료` };
            }

            if (user === TOKEN_INVALID) {
                return { success: false, msg: `INVALID_TOKEN : 유효하지 않은 토큰` };
            }
            if (user === undefined) {
                return { success: false, msg: `INVALID_TOKEN : 유효하지 않은 토큰` };
            }

            return { success: true, msg: `로그인 성공` };
        } catch (err) {
            throw err;
        }
    },
};

module.exports = authUtil;
