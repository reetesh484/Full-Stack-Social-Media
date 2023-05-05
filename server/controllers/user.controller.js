import User from '../model/User.js'
import asyncHandler from '../service/asyncHandler.js'
import CustomError from '../service/customError.js'


export const getUser = asyncHandler(async(req,res) => {
    const {id:userId} = req.params;

    const user = await User.findById(userId);
    if(!user){
        throw new CustomError("User not found",404);
    }

    res.status(200).json({
        success:true,
        user
    })
})