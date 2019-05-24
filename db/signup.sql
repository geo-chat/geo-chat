INSERT INTO chatuser(username,password)
values($1,$2);
SELECT * FROM chatuser WHERE username = $1;