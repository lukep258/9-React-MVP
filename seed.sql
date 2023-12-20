drop table if exists players;
drop table if exists curr_lobby;

create table players(
    id serial primary key,
    username varchar,
    wpm integer,
    IP varchar
);

insert into players (username,rank,wpm,IP) values (
    'guest3425',
    60,
    '1a2b3c4d'
);
insert into players (username,rank,wpm,IP) values (
    'guest6345',
    60,
    '9z8y7x6w'
);
