import db from "../config/database.js";

export const dadosUser = async (req, res) => {
    const token = res.locals.token;
    const dados = await db.query(`
    SELECT 
	u.id AS id, 
	u.name AS name, 
	SUM(url."visitCount") AS "visitCount", 
	json_agg(json_build_object(
		'id', url.id, 
		'shortUrl', url."shortUrl", 
		'url', url.url, 
		'visitCount', url."visitCount"
	)) AS "shortenedUrls"
    FROM users AS u 
    JOIN urls AS url 
        ON u.id = url."userId" 
    JOIN sessions AS s
        ON u.id = s."userId"
    WHERE s.token = $1
    GROUP BY u.id, u.name;
    `, [token])


    res.send(dados.rows[0])
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