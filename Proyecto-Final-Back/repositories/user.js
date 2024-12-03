const User = require("../models/user");

class UserRepository{

    static async getOne(query){
        return await User.findOne(query);
    }

    static async create(userData){
        const user = new User(userData);
        return await user.save();
    }
}

module.exports = { UserRepository };