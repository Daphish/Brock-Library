const Review = require("../models/review");

class ReviewRepository {

    static async getById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await Review.find({ bookId: id });
    }

    static async create(reviewData){
        const review = new Review(reviewData);
        return await review.save();
    }

    static async deleteById(id){
        if (!ObjectId.isValid(id)){
            return null;
        }
        return await Review.deleteOne({ _id: id});
    }
}

module.exports = { ReviewRepository }