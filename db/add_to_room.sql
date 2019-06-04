UPDATE chatroom SET member = member+1 WHERE id = $1;

SELECT * FROM chatroom
WHERE SQRT(POWER((lat - $2), 2)+ POWER((lng - $3), 2)) <= (.0145 * $4) ORDER BY id DESC;