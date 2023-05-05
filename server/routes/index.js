import { Router } from "express";
import authRoutes from './auth.route.js'

const router = Router();

app.use("/auth",authRoutes)

export default router;