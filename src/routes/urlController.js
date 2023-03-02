import { Router } from 'express'
import { criarUrl, pegarUrl } from '../controllers/urlController.js'
import { authValidate } from '../middlewares/authMiddlewares.js'


const urlRouter = Router()

urlRouter.post("/urls/shorten", authValidate, criarUrl)
urlRouter.get("/urls/:id", pegarUrl)

export default urlRouter