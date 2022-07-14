"use strict";

const Profile = require("../../models/Profile/profile");
const logger = require("../../config/logger");
const { response } = require("express");

const output = {
    home: (req, res) => {
        logger.info(`GET / 200 "홈 화면"`);
        res.render("index");
    },
};

const process = {
    readProfile: async (req, res) => {
        try {
            const profile = new Profile();
            const response = await profile.getProfile();
            const url = {
                method: "GET",
                path: "/moae/main/:userNo",
                status: response.success ? 200 : 404,
            };

            log(response, url);
            return res.status(response.success ? 200 : 404).json(response);
        } catch (err) {
            throw err;
        }
    },

    //     updateProfile: (req, res) => {
    //         try {
    //             const insta = new ToDo();1
    //             const response = await insta.Read();
    //             const url = {
    //                 method: "GET",
    //                 path: "/home",
    //                 status: !response.success ? 404 : 200,
    //             };

    //             log(response, url);
    //             return res.status(url.status).json(response);
    //         } catch (err) {
    //             throw err;
    //         }
    //     },
};

module.exports = { output, process };

// logger.log(response, url);
// 로그출력

// const log = (response, url) => {
//     if (response.err) {
//         logger.error(
//             `${url.method} / ${url.status}  Response: ${response.err}`
//         );
//     } else {
//         logger.info(
//             `${url.method} / ${url.status}  Response: ${response.msg || ""}`
//         );
//     }
// };
