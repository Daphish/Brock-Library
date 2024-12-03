const { response, request } = require("express");
const User = require("../models/user");
const { UserRepository } = require("../repositorioes/user");

const getAllUsers = async ( req = request, res = response) => {
    try{
        const result = await UserRepository.getAll({});
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos"
        })
    }
}

module.exports = {
    getAllUsers,
}