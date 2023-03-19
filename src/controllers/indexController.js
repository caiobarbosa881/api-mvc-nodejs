'use strict';

const User = require("../models/User");

const renderPage = async (req, res) => {
    const userData = [];

    const users = await User.findAll();
    users.forEach(user => userData.push(user));
    return res.status(200).json({
        userData
    });
}

module.exports = { renderPage };
