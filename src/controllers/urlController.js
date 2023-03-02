import { nanoid } from "nanoid";
import db from "../config/database.js";

export const criarUrl = async (req, res) => {
    const {url} = req.body;
    const {id} = res.locals.sessions;

    try {
        if(!url || url.length < 8) return res.sendStatus(422)

        const shortUrl = nanoid()
        await db.query(`
        INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)
        `, [url, shortUrl, id])

        const dados = await db.query(`
        SELECT id, "shortUrl" from urls;
        `)

        res.status(201).send(dados.rows[0])
    } catch (error) {
        res.status(500).send(error)
    }
}