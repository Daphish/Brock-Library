const Cart = require("../models/cart");

class CartRepository {

    static async getById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await Cart.findOne({ userId: id })
    }

    static async create(cartData){
        const cart = new Cart(cartData);
        return await cart.save();
    }

    static async updateById(id, updatedData){
        if (!ObjectId.isValid(id)){
            return null;
        }
        return await Cart.updateOne({userId: id}, updatedData);
    }
}

module.exports = { CartRepository }