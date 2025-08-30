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


module.exports = {
    get,
    getByFilter,
    update
};