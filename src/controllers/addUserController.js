'use strict';

const User = require("../models/User");

const addUser = async (req, res) => {
    const { name, email, age } = req.body;

    const userExist = await User.findOne({
        where: {
            email
        }
    });

    if (!userExist) {        
        if (name && email && age !== null) {
            const userCreated = await User.create({ name, email, age });
            return res.status(201).json({ mensagem: "Usuário criado com sucesso!!!" });
        }
    }

    return res.status(409).json({ mensagem: "O email inserido já é utilizado."});
};

module.exports = {
    addUser
}
