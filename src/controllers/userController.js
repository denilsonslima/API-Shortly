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