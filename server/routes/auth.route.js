import {Router} from 'express'
import { login, logout, register } from '../controllers/auth.controller'

const router = Router()

router.post('/',register)
router.post('/login',login)
router.post('/logout',logout)

export default router