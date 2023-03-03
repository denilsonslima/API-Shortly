import { Router } from 'express'
import { dadosUser } from '../controllers/userController.js'
import { authValidate } from '../middlewares/authMiddlewares.js'

const userRouter = Router()

userRouter.get("/users/me", authValidate, dadosUser)

export default userRouter