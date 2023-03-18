'use strict';

const User = require("../models/User");

const renderUserById = async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if(user){
        res.json(user);
    }
    return res.json({ mensagem: "Nenhum Usuário foi encontrado"});
}


module.exports = { renderUserById };