import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    userId:{
        type:String 
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String,
    },
    location:{
        type:String,
    },
    description:{
        type:String
    },
    picturePath:{
        type:String,
    },
    userPicturePath:{
        type:String,
    },
    likes:{
        
    },
    comments:{
        type:[String]
    }
})