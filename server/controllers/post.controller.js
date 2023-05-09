import Post from '../model/Post.js'
import User from '../model/User.js';
import asyncHandler from '../service/asyncHandler.js'
import CustomError from '../service/customError.js'

export const createPost = asyncHandler(async(req,res) => {
    const {userId, description, picturePath} = req.body;
    console.log(req.body)
    const user  = await User.findById(userId);

    if(!user){
        throw new CustomError("User not found",404);
    }

    const newPost = new Post({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        location:user.location,
        description,
        userPicturePath:user.picturePath,
        picturePath,
        likes:{},
        comments:[]
    })

    await newPost.save()

    const posts = await Post.find();
    res.status(201).json({
        success:true,
        posts
    })
})


export const getFeedPosts = asyncHandler(async(req,res) => {
    const posts = await Post.find({});

    if(!posts){
        throw new CustomError("No posts found",404);
    }

    res.status(200).json({
        success:true,
        posts
    })
})

export const getUserPosts = asyncHandler(async(req,res) => {
    const {userId} = req.params;
    const posts = await Post.find({userId})

    if(!posts){
        throw new CustomError("No posts found",404);
    }

    res.status(200).json({
        success:true,
        posts
    })

})


export const likePost = asyncHandler(async(req,res) => {
    const {id} = req.params;
    const {userId} = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if(isLiked){
        post.likes.delete(userId);
    }else{
        post.likes.set(userId,true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        {likes:post.likes},
        {new:true}
    )

    res.status(200).json({
        success:true,
        post:updatedPost
    })
})