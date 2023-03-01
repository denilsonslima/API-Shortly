import db from "../config/database.js"

export async function authValidate(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if(!token) return res.status(422).send("Informe o token!");
    try {
        const tokenValidate = await db.query(`
            SELECT * FROM tokens;
        `)
        
        if(tokenValidate.rows.length === 0) return res.sendStatus(401);
        
        res.locals.sessao = tokenValidate;
        next()
    } catch (error) {
        res.status(500).send(error)
    }
} 