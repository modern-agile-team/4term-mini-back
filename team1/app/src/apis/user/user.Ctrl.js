"use strict";

const User = require("../../models/service/User/User");

const process = {
    searchUser: async (req, res) => {
        try {
            const user = new User(req),
                response = await user.searchUser();

            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.json(err.toString());
        }
    },

    login: async (req, res) => {
        try {
            const user = new User(req),
                response = await user.checkUser();

            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.json(err.toString());
        }
    },

    register: async (req, res) => {
        try {
            const user = new User(req),
                response = await user.register();

            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.json(err.toString());
        }
    },

    delUser: async (req, res) => {
        try {
            const user = new User(req),
                response = await user.delUser();

            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.json(err.toString());
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = new User(req),
                response = await user.updateUser();

            return res.json(response);
        } catch (err) {
            console.log(err);
            return res.json(err.toString());
        }
    },
};

module.exports = { process };
