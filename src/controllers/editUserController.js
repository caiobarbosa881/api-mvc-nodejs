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
        return res.json({"mensagem": "Usuário editado com sucesso!!!"});
    }).catch(() => {
        return res.redirect("/?error=invalidUserId");
    });
}

module.exports = {
    editUser
};
