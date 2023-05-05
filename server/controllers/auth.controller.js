import User from "../model/User.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";

export const cookieOptions = {
    expires:new Date(Date.now + 3*24*60*60*1000),
    httpOnly:true
}


//Register User
export const register = asyncHandler(async (req, res) => {
  //get data from user
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;

  //validation
  if(!firstName || !lastName || !email || !password || !picturePath || !friends || !location || !occupation ){
    throw new CustomError("Please add all the fields",400);
  }

  const existingUser = await User.findOne({email})

  if(existingUser){
    throw new CustomError("User already exists",400);
  }

  //lets add data to the database
  const user = User.create({
    firstName,lastName,email,password,picturePath,friends,location,occupation
  })

  //generate JWT Token
  const token = user.getJWTtoken()

  user.password = undefined 
  
  //store this token in user's coookie
  res.cookie("token",token,cookieOptions)

  //send back a response to the user
  res.status(201).json({
    success:true,token,user
  })

});


export const login = asyncHandler(async(req,res) => {
    const {email,password} = req.body

    //validation
    if(!email || !password){
        throw new CustomError("Please fill all details",400);
    }

    const user = await User.findOne({email}).select("+password")

    //if user doesn't exists
    if(!user){
        throw new CustomError("Invalid credentials",400);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(isPasswordMatched){
        const token = user.getJWTtoken()
        user.password = undefined;
        res.cookie('token',token,cookieOptions)
        return res.status(200).json({
            success:true,
            token,
            user
        })
    }
})

export const logout = asyncHandler(async(req,res) => {
    res.cookie("token",null,{expires:new Date(Date.now()),httpOnly:true})

    res.status(200).json({
        success:true,
        message:"Logged out"
    })
})