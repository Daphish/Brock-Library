const { response, request } = require("express");
const Cart = require("../models/cart");
const { CartRepository } = require("../repositories/cart");

const updateCart = async (req = request, res = response) => {
    const { bookId, quantity } = req.body;
    const cartData = { bookId, quantity };

    if (!bookId || !quantity){
        res.status(400).json({
            msg: "Información incompleta"
        });
    }

    const userId = req.userActive._id;

    try{
        const result = await CartRepository.updateById(userId, cartData);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el carrito"
            });
            return;
        }
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar el carrito"
        })
    }
}

module.exports = {
    updateCart
}