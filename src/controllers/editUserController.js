const User = require("../models/User");

const editUser = async (req, res) => {
    const { name, email, age } = req.body;
    
    User.findOne({
        where: {
            userId: req.params.userId,
        }
    }).then((user) => {
        user.update({ name, email, age });
        return res.redirect("/");
    }).catch(() => {
        return res.redirect("/?error=invalidUUID");
    });
}

module.exports = {
    editUser
};
