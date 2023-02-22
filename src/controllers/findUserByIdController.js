const User = require("../models/User");

const renderUserById = async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if(user){
        res.json(user);
    }
    res.render("404");   
}


module.exports = { renderUserById };