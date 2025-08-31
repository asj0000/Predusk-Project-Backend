const  UserService = require('../services/user-services');
const userServiceObj = new UserService();

const get = async( req , res  )=>{
        try {
            const result = await userServiceObj.getAllUsers();
            return res.status(200).json({
                data: result,
                success: true,
                message:"Successfuly fetched users",
                err: {}
            })
        } catch (error) {
            console.log("Error in controller ", error);
            return res.status(500).json({
                data:{},
                success:false,
                message: "Failed to fetch users",
                err: error
            })
            
        }

}

const getByFilter = async( req , res )=>{
    try {
        const id = req.params.id;
        const column = req.params.column;
        const result = await userServiceObj.getByFilter( id , column);
        return res.status(200).json({
            data: result,
            success: true,
            message:"Successfuly fetched details",
            err: {}
        })
        
    } catch (error) {
        console.log("Error in controller ", error);
        return res.status(500).json({
            data:{},
            success:false,
            message: "Failed to fetch ",
            err: error
        })
        
    }
}

const update = async ( req  , res )=>{
    try {

        const id = req.params.id;
        const result = await userServiceObj.update( id , req.body);
        return res.status(200).json({
            data: result,
            success: true,
            message:"Successfuly updated details",
            err: {}
        })
    } catch (error) {
        console.log("Error in controller ", error);
        return res.status(500).json({
            data:{},
            success:false,
            message: "Failed to update ",
            err: error
        })
    }


}

const getBySkill = async( req, res)=>{
    try {
        const {id} = req.params;
        const skillName  = req.query.name;
        console.log("skill in query param" , skillName);
        const response = await userServiceObj.getBySkill( id , skillName);
        if( !response){
            return res.status(400).json({
                data:  null,
                success: true,
                message:"Skill does not exist",
                err: {}
            })
        }else{
            return res.status(200).json({
                data: response,
                success: true,
                message:"Successfuly fethced skill",
                err: {}
            })

        }

    } catch (error) {
        console.log("Error in controller ", error);
        return res.status(500).json({
            data:{},
            success:false,
            message: "Failed to get ",
            err: error
        })
        
    }
}


module.exports = {
    get,
    getByFilter,
    update,
    getBySkill
};