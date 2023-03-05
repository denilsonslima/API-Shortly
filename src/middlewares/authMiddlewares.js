import db from "../config/database.js"

export async function authValidate(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if(!token) return res.status(422).send("Informe o token!");
    try {
        const {rows: [user]} = await db.query(`
            SELECT users.id FROM users 
            JOIN sessions
                ON users.id = sessions."userId"
                WHERE sessions.token = $1;
        `, [token])
        
        if(!user) return res.sendStatus(401);
        
        res.locals.sessions = user
        next()
    } catch (error) {
        res.status(500).send(error)
    }
} 