import {Router} from 'express'
import { registerUser, loginUser } from "../controllers/user.js";

const userRouter = Router()

// register user
userRouter.post('/register', registerUser)

// login user
userRouter.post('/login', loginUser)

export default  userRouter