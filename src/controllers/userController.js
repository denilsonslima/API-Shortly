import db from "../config/database.js";

export const dadosUser = async (req, res) => {
    const {id: userId} = res.locals.sessions;

    try {
        const {rows: [dados]} = await db.query(`
        SELECT 
            users.id, 
            users.name, 
            SUM(urls."visitCount") AS "visitCount", 
            json_agg(json_build_object(
            'id', urls.id, 
            'shortUrl', urls."shortUrl", 
            'url', urls.url, 
            'visitCount', urls."visitCount"
            )) AS "shortenedUrls"
        FROM users
        LEFT JOIN urls
            ON users.id = urls."userId" 
        WHERE users.id = $1
        GROUP BY users.id, users.name;
        `, [userId])

        res.send(dados)     
         
    }  catch (error) {
        res.status(500).send(error)
    }

    res.send()
}

export const deletarUsuario = async (req, res) => {
    const {sessions} = res.locals;
    const {id} = req.params;

    const {rows: url, rowCount} = await db.query(`
    SELECT * FROM urls WHERE id = $1
    `, [id])

    if(rowCount < 1) return res.sendStatus(404)

    const deleteUser = url[0].userId !== sessions.id;
    if(deleteUser) return res.sendStatus(401)

    await db.query(`
    DELETE FROM urls WHERE id = $1
    `, [id])

    res.sendStatus(204)
}

export const ranking = async (req, res) => {
    const dados = await db.query(`
    SELECT users.id, users.name, count(urls.id) AS "linksCount",
    coalesce(sum(urls."visitCount"),0) AS "visitCount"
    FROM users
    LEFT JOIN urls ON users.id = urls."userId"
    GROUP BY users.id, users.name
    ORDER BY "visitCount" DESC
    LIMIT 10
    `)

    res.send(dados.rows)
}