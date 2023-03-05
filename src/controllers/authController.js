import db from "../config/database.js";
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

export const fazerCadastro = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const {rowCount} = await db.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])

        if(rowCount > 0) return res.status(409).send();

        const senhaCriptografada = bcrypt.hashSync(password, 10)

        await db.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        `, [name, email, senhaCriptografada])

        res.status(201).send("Usuário cadastrado!")
    } catch (error) {
        res.status(500).send(error)
    }
}

export const fazerLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const {rows: [user], rowCount} = await db.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])

        if(rowCount > 0 && bcrypt.compareSync(password, user.password)){
            const token = uuidV4();
            
            await db.query(`
            INSERT INTO sessions (token, "userId") values ($1, $2);
            `,[token, user.id])

            res.send({token})
        } else {
            res.status(401).send("Usuário ou senha incorretos!")
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}