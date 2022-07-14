"use strict";

const User = require("../../models/User/user"),
    logger = require("../../config/logger"),
    { response } = require("express");

const process = {
    register: async (req, res) => {
        try {
            const user = new User();
            const response = await user.register();
            const url = {
                method: "GET",
                path: "/home",
                status: !response.success ? 404 : 200,
            };

            log(response, url);
            return res.status(url.status).json(response);
        } catch (err) {
            throw err;
        }
    },
};

module.exports = { process };

const log = (response, url) => {
    if (response.err) {
        logger.error(
            `${url.method} / ${url.status}  Response: ${response.err}`
        );
    } else {
        logger.info(
            `${url.method} / ${url.status}  Response: ${response.msg || ""}`
        );
    }
};
