import { Router } from 'express'
import { dadosUser, deletarUsuario } from '../controllers/userController.js'
import { authValidate } from '../middlewares/authMiddlewares.js'

const userRouter = Router()

userRouter.get("/users/me", authValidate, dadosUser)
userRouter.delete("/urls/:id", authValidate, deletarUsuario)

export default userRouter