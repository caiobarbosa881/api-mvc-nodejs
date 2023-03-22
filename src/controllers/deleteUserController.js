'use strict';

const User = require("../models/User");

const deleteUser = async (req, res) => {
    
    if (req.params.userId == undefined || req.params.userId == null) {
        return res.status(204).json({ mensagem: "Nenhum usuário com esse id foi encontrado."});
    };
    
    await User.destroy({
        where: {
            userId: req.params.userId,
        }
    });

    return res.status(204).json({ mensagem: "O usuário foi removido com sucesso!!!"});
};

module.exports = { 
   deleteUser
};
