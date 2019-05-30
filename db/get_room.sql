SELECT * FROM chatroom
WHERE SQRT(POWER((CAST(lat AS float) - $1), 2)+ POWER((CAST(lng AS float) - $2), 2)) <= (.0145 * $3);