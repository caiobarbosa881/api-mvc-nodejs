'use strict';

const User = require("../models/User");

const editUser = async (req, res) => {
    const { name, email, age } = req.body;
    
    User.findOne({
        where: {
            userId: req.params.userId,
        }
    }).then((user) => {
        user.update({ name, email, age });
        return res.status(200).json({ mensagem: "Usuário editado com sucesso!!!"});
    }).catch(() => {
        return res.status(404).json({ mensagem: "ID de usuário inválido"});
    });
}

module.exports = {
    editUser
};
