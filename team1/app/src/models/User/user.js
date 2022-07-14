"use strict";

const UserStorage = require("./userStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async register() {
        const client = this.body;
        console.log(client);
        try {
            const data = await UserStorage.save(client);
            if (!data.length) {
                return { success: false };
            } else {
                return { data, success: true };
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;
