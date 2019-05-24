insert into chatuser(username,password)
values($1,$2);
select * from chatuser where username = $1;