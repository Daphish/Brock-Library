const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
        {
          bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
          quantity: { type: Number, default: 1 }
        }
    ]
})

module.exports = mongoose.model("Cart", cartSchema);