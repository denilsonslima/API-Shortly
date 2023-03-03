import db from "../config/database.js"

export async function authValidate(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if(!token) return res.status(422).send("Informe o token!");
    try {
        const tokenValidate = await db.query(`
            SELECT users.id FROM sessions 
            JOIN users
                ON users.id = sessions."userId"
                WHERE sessions.token = $1;
        `, [token])
        
        if(tokenValidate.rowCount == 0) return res.sendStatus(401);
        
        res.locals.sessions = tokenValidate.rows[0]
        res.locals.token = token
        next()
    } catch (error) {
        res.status(500).send(error)
    }
} 