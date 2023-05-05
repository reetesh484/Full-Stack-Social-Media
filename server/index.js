import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js'
import User from './model/User.js';
import Post from './model/Post.js';
import {users,posts} from './data/index.js'

// Configurations 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use(cookieParser())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))


// File storage 

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/assets')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

app.use("/api/v1",routes)

// app.post("/auth/register",upload.single('picture'),register)


const PORT = process.env.PORT || 6001;

const start = async() => {
    try{
        //connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,() => {
            console.log(`Server is listening on port ${PORT}`)
        })
        //to populate dummy data
        // User.insertMany(users);
        // Post.insertMany(posts);
    } catch(error){
        console.log(error);
    }
}

start()