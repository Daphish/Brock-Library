const Cart = require("../models/cart");
const ObjectId = require("mongoose").Types.ObjectId;

class CartRepository {

    static async getById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await Cart.findOne({ userId: id }).populate('items.bookId');
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