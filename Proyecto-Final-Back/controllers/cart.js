const { response, request } = require("express");
const Cart = require("../models/cart");
const { CartRepository } = require("../repositories/cart");

const updateCart = async (req = request, res = response) => {
    const { bookId, quantity } = req.body;

    if (!bookId || !quantity){
        return res.status(400).json({
            msg: "Información incompleta"
        });
    }

    const userId = req.userActive._id;

    try{
        let cart = await CartRepository.getById(userId);
        if (!cart) {
            res.status(404).json({
                msg: "No se encontró el carrito"
            });
            return;
        }

        const existingItemIndex = cart.items.findIndex(item => item.bookId._id.toString() === bookId);
        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ bookId, quantity });
        }
        console.log(cart);
        const result = await CartRepository.updateById(userId, cart);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el carrito"
            });
            return;
        }
        const updatedCart = await CartRepository.getById(userId);
        res.status(200).json(updatedCart);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar el carrito"
        })
    }
}

const deleteFromCart = async (req = request, res = response) => {
    const { id } = req.params;

    if (!id){
        return res.status(400).json({
            msg: "Información incompleta"
        });
    }

    const userId = req.userActive._id;

    try{
        let cart = await CartRepository.getById(userId);
        if (!cart) {
            res.status(404).json({
                msg: "No se encontró el carrito"
            });
            return;
        }

        const existingItemIndex = cart.items.findIndex(item => item.bookId._id.toString() === id);
        if (existingItemIndex >= 0) {
            if(cart.items[existingItemIndex].quantity > 1){
                cart.items[existingItemIndex].quantity -= 1;
            } else {
                const newCart = cart.items.filter(item => item.bookId._id.toString() !== id);
                cart.items = newCart;
            }
        } else {
            res.status(404).json({
                msg: "No se encontró el libro"
            });
            return;
        }
        const result = await CartRepository.updateById(userId, cart);
        if(result === null){
            res.status(404).json({
                msg: "No se encontró el carrito"
            });
            return;
        }
        const updatedCart = await CartRepository.getById(userId);
        res.status(200).json(updatedCart);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar el carrito"
        })
    }
}

module.exports = {
    updateCart,
    deleteFromCart
}