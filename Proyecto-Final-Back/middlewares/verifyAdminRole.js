const { response, request } = require("express");

const verifyAdminRole = (req = request, res = response, next) => {

    if(!req.userActive){
        return res.status(401).json({
            msg: "Permiso denegado"
        });
    }

    if(req.userActive.role != "admin"){
        return res.status(401).json({
            msg: "Permiso denegado"
        });
    }

    next();
}

module.exports = {
    verifyAdminRole
}