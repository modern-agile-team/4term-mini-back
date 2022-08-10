"use strict";

const db = require("../../../config/mysql");

class UserStorage {
    static async getUserbyNo(no) {
        try {
            const query = "SELECT * FROM users WHERE no=?;",
                data = await db.query(query, [no]);

            return data[0][0];
        } catch (err) {
            throw err;
        }
    }

    static async getUserbyNickname(nickname) {
        try {
            const nickName = "%" + nickname + "%",
                query = "SELECT * FROM users WHERE nickname LIKE ?;",
                data = await db.query(query, [nickName]);

            return data[0][0];
        } catch (err) {
            throw err;
        }
    }

    static async getUserbyEmail(email) {
        try {
            const query = "SELECT * FROM users WHERE email=?;",
                data = await db.query(query, [email]);

            return data[0][0];
        } catch (err) {
            throw err;
        }
    }

    static async saveUser(userInfo) {
        try {
            const insertQuery = `INSERT INTO users(nickname,name,website,description,email,phone,gender,profile_image)
                     VALUES(?,?,?,?,?,?,?,?);`;

            return await db.query(insertQuery, Object.values(userInfo));
        } catch (err) {
            throw err;
        }
    }

    static async delUser(no) {
        try {
            const query = "DELETE FROM users WHERE no=?;",
                delUser = await db.query(query, [no]);

            return delUser[0].affectedRows;
        } catch (err) {
            throw err;
        }
    }

    static async updateUser(values) {
        try {
            const query = `UPDATE users SET nickname=?, name=?, website=?,
                description=?, email=?, phone=?, gender=?, profile_image=?
                WHERE users.no = ?;`;

            const data = await db.query(query, values);

            return data[0].affectedRows;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserStorage;
