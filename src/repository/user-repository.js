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

    async getBySkillName( userId , skillName ){
        try {
            console.log("skillName" , skillName);
            const userData = await User.findByPk(userId);
            const skills = userData.skills || [];
            console.log("Skills and its datatype" , skills , typeof skills)
            const skill = skills.find(
                (s) => s.toLowerCase() === skillName.toLowerCase()
            );
            console.log("skill fetched ", skill);
            return skill || null;
            
        } catch (error) {
            console.log("Error in Repo file")
            throw error
            
        }
        

    }

    async update( userId , data ){
       try {
        const user = await User.findByPk(userId);

        Object.keys(data).forEach((field) => {
            if (Array.isArray(user[field]) && Array.isArray(data[field])) {
                if (field === "skills") {
                    // ✅ merge unique values only for skills
                    if (data.overwrite && data.overwrite.includes(field)) {
                        user[field] = data[field];
                    }else{
                        const incoming = Array.isArray(data[field]) ? data[field] : [data[field]];
                        user[field] = Array.from(new Set([...(user[field] || []), ...incoming]));
                    } 

                } else {
                    // ✅ normal append for other array fields
                    user[field] = [...user[field], ...data[field]];
                }
            } else if (
                typeof user[field] === "object" &&
                typeof data[field] === "object" &&
                !Array.isArray(user[field])
            ) {
                // ✅ deep merge objects
                user[field] = deepMerge(user[field], data[field]);
            } else {
                // ✅ overwrite primitive fields
                user[field] = data[field];
            }
        });

                await user.save();
                return user;
        } catch (error) {
            console.log("Error in Repo file", error);
            throw error;
        }

    }

}

module.exports = UserRepository