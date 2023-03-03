import { nanoid } from "nanoid";
import db from "../config/database.js";

export const criarUrl = async (req, res) => {
    const {url} = req.body;
    const {id} = res.locals.sessions;

    try {
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

export const pegarUrl = async (req, res) => {
    const {id} = req.params;
    try {
        const dados = await db.query(`
        SELECT id, "shortUrl", url FROM urls WHERE "userId" = $1
        `, [id])

        if(dados.rowCount === 0) return res.sendStatus(404);

        if(dados.rowCount === 1) return  res.send(dados.rows[0])
       
        res.send(dados.rows)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const redirecionarParaUrl = async (req,res) => {
    const {shortUrl} = req.params;

    try {
        const dados = await db.query(`
            
            SELECT url, "visitCount" FROM urls WHERE "shortUrl" = $1`
            , 
            [shortUrl]
        )

        if(dados.rowCount === 0) return res.sendStatus(404)

        const visitCount = Number(dados.rows[0].visitCount) + 1

        await db.query(
            
            `UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`
            , 
            [visitCount, shortUrl]
        )

        res.redirect(dados.rows[0].url)
    } catch (error) {
        res.status(500).send(error)
    }
}