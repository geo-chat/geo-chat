SELECT * FROM chatroom
WHERE SQRT(POWER((lat - $1), 2)+ POWER((lng - $2), 2)) <= (.0145 * $3) ORDER BY id DESC;