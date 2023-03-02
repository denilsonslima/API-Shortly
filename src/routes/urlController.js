import { Router } from 'express'
import { criarUrl } from '../controllers/urlController.js'
import { authValidate } from '../middlewares/authMiddlewares.js'


const urlRouter = Router()

urlRouter.post("/urls/shorten", authValidate, criarUrl)

export default urlRouter