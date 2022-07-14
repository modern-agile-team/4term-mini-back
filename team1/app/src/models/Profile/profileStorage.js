"use strict";

const db = require("../../config/mysql");

class ProfileStorage {
    static async selectProfile(resolve, reject) {
        try {
            const query =
                "INSERT INTO user('nickname','email',gender,'create_date') VALUES();";
            // "SELECT * FROM users;";
            await db.query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ProfileStorage;
