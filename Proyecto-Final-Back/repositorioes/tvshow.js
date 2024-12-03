const TvShow = require("../models/tvshow");
const ObjectId = require("mongoose").Types.ObjectId;

class TvShowRepository{
    
    static async getAll(){
        return await TvShow.find();
    }

    static async getById(id){
        if(!ObjectId.isValid(id)){
            return null;
        }
        return await TvShow.findOne({ _id: id })
    }

    static async create(tvShowData){
        const tvShow = new TvShow(tvShowData);
        return await tvShow.save();
    }

    static async deleteById(id){
        if (!ObjectId.isValid(id)){
            return null;
        }
        return await TvShow.deleteOne({ _id: id});
    }

    static async updateById(id, updatedData){
        if (!ObjectId.isValid(id)){
            return null;
        }
        return await TvShow.updateOne({_id: id}, updatedData);
    }
}

module.exports = { TvShowRepository }