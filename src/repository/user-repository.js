const {User} = require('../models/index');

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (
            source[key] &&
            typeof source[key] === "object" &&
            !Array.isArray(source[key])
        ) {
            // If nested object, merge recursively
            target[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            // Otherwise just replace
            target[key] = source[key];
        }
    }
    return target;
}

class UserRepository {
 
    async getAll(){
        try {
            const users = await User.findAll();
            return users;
            
        } catch (error) {
            console.log("Error");
            throw error
        }
    }

    async getByFilter(userId , columnName ){
        try {
            const data = await User.findByPk(userId, {
                attributes: [columnName]  
            });
            console.log("Data in Repo method " , data)
            return data;
            
        } catch (error) {
            console.log("Error in Repo file")
            throw error
            
        }
    }

    async update( userId , data ){
        try {
            const user  = await User.findByPk( userId );

            Object.keys(data).forEach(( field )=>{
                 if (Array.isArray(user[field]) && Array.isArray(data[field])) {
                    // merge arrays instead of replacing
                    user[field] = [...user[field], ...data[field]];
                } else if (
                    typeof user[field] === "object" &&
                    typeof data[field] === "object" &&
                    !Array.isArray(user[field])
                ) {
                    user[field] = deepMerge(user[field], data[field]);
                } else {
                    // normal assignment
                    user[field] = data[field];
                }
            })

            await user.save();
            return user;
        } catch (error) {
            console.log("Error in Repo file")
            throw error;
            
        }
    }

}

module.exports = UserRepository