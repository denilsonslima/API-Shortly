import { Router } from 'express'
import { criarUrl, pegarUrl, redirecionarParaUrl } from '../controllers/urlController.js'
import { authValidate } from '../middlewares/authMiddlewares.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { urlSchema } from '../schema/urlSchema.js'


const urlRouter = Router()

urlRouter.post("/urls/shorten", authValidate, validateSchema(urlSchema), criarUrl)
urlRouter.get("/urls/:id", pegarUrl)
urlRouter.get("/urls/open/:shortUrl", redirecionarParaUrl)

export default urlRouter