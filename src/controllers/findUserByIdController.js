'use strict';

const User = require("../models/User");

const renderUserById = async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if(user){
        res.status(200).json(user);
    }
    return res.status(404).json({ mensagem: "Nenhum Usuário foi encontrado"});
}


module.exports = { renderUserById };