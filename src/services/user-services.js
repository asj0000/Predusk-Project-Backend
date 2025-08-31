const UserRepository = require('../repository/user-repository');

class UserService {
    constructor(){
        this.userRepoObjec = new UserRepository();
    }

    async getAllUsers(){
        try {
            const response = await this.userRepoObjec.getAll();
            return response;
            
        } catch (error) {
            throw error;
        }

    }

    async getByFilter(userId , columnName){
        try {
            const response = await this.userRepoObjec.getByFilter( userId , columnName);
            return response;
        } catch (error) {
            console.log("Error in Service file")
            throw error;
            
        }
    }

    async update( userId , data ){
        try {
            const response = await this.userRepoObjec.update( userId ,  data);
            return response;
        } catch (error) {
            console.log("Error in Service file")
            throw error;
            
        }
    }

    async getBySkill( userId , skillName ){
        try {
            const response = await this.userRepoObjec.getBySkillName(userId , skillName);
            if( !response ){
                return null;
            }
            return response;
        } catch (error) {
            console.log("Error in Service file")
            throw error;
        }
    }
}

module.exports = UserService;