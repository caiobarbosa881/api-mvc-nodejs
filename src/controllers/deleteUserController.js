const User = require("../models/User");

const deleteUser = async (req, res) => {
    
    if (req.params.userId == undefined || req.params.userId == null) {
        return res.redirect("/?error=noUserSpecified");
    };
    
    await User.destroy({
        where: {
            userId: req.params.userId,
        }
    });

    return res.redirect("/");
};

module.exports = { 
   deleteUser
};
