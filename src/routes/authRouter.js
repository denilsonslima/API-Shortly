import { Router } from 'express'
import { fazerCadastro, fazerLogin } from '../controllers/authController.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { schemaSignin, schemaSignup } from '../schema/authSchema.js'


const authRouter = Router()

authRouter.post("/signup", validateSchema(schemaSignup), fazerCadastro)
authRouter.post("/signin", validateSchema(schemaSignin), fazerLogin)

export default authRouter;