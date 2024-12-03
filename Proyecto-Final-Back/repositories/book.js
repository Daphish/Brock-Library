const Book = require("../models/book");
const ObjectId = require("mongoose").Types.ObjectId;

class BookRepository{
    
    static async getAll(){
        return await Book.find();
    }

    static async getById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await Book.findOne({ _id: id })
    }

    static async create(bookData){
        const book = new Book(bookData);
        return await book.save();
    }

    static async deleteById(id){
        if (!ObjectId.isValid(id)){
            return null;
        }
        return await Book.deleteOne({ _id: id});
    }

    static async updateById(id, updatedData){
        if (!ObjectId.isValid(id)){
            return null;
        }
        return await Book.updateOne({_id: id}, updatedData);
    }
}

module.exports = { BookRepository }