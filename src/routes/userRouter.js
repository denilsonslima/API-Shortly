import { Router } from 'express'
import { dadosUser, deletarUsuario, ranking } from '../controllers/userController.js'
import { authValidate } from '../middlewares/authMiddlewares.js'

const userRouter = Router()

userRouter.get("/users/me", authValidate, dadosUser)
userRouter.delete("/urls/:id", authValidate, deletarUsuario)
userRouter.get("/ranking", ranking)

export default userRouter