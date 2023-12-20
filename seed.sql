drop table if exists players;

create table players(
    id serial primary key,
    username varchar,
    wpm integer,
    IP varchar
);