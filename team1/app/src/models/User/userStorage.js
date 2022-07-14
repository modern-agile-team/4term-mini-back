"use strict";

const db = require("../../config/mysql");

class UserStorage {
    static async save(userInfo) {
        try {
            return new Promise((resolve, reject) => {
                const { nickname, email, gender } = userInfo;
                const query =
                    "INSERT INTO user('nickname','email',gender) VALUES(?,?,?);";
                db.query(query, [nickname, email, gender], (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserStorage;
