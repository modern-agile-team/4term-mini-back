"use strict";

const ProfileStorage = require("./ProfileStorage");

class Profile {
    constructor(body) {
        this.body = body;
    }

    getProfile() {
        try {
            console.log("testy");
            return { success: true, data: "test" };
            // const data = ProfileStorage.selectProfile();
            // if (!data.length) {
            //     return { success: false };
            // } else {
            //     return { data, success: true };
            // }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Profile;
