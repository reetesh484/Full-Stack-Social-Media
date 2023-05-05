import { Router } from "express";
import authRoutes from './auth.route.js'
import userRoutes from './user.route.js'
const router = Router();

app.use("/auth",authRoutes)
app.use("/user",userRoutes)

export default router;