INSERT INTO chatuser(username,password)
VALUES($1,$2);
SELECT * FROM chatuser WHERE username = $1;