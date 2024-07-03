import {Router} from 'express'
import { registerUser, loginUser, updateUser } from "../controllers/user.js";
import { authMiddleware } from '../middleware/authMiddleware.js'

const userRouter = Router()

// register user
userRouter.post('/register', registerUser)

// login user
userRouter.post('/login', loginUser)

userRouter.patch('/me', authMiddleware ,updateUser)

export default  userRouter