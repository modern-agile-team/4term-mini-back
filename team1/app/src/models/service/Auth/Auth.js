"use strict";

const jwt = require("jsonwebtoken");

class Auth {
    newToken = user => {
        try {
            const payload = {
                no: user.no,
                nickname: user.nickname,
                profile: user.profileImg,
            };

            return jwt.sign(payload, process.env.SECRET_KEY, {
                algorithm: "HS256",
                expiresIn: "24h",
                issuer: "modern agile",
            });
        } catch (err) {
            throw err;
        }
    };

    verifyToken = token => {
        try {
            let decoded;

            decoded = jwt.verify(token, process.env.SECRET_KEY);

            return decoded;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = Auth;
