drop table if exists curr_lobby;
drop table if exists players;

create table curr_lobby(
    id serial primary key,
    pCount integer
);
create table players(
    id serial primary key,
    username varchar,
    rank integer,
    wpm integer,
    sID varchar,
    lID integer references curr_lobby(id)
);

insert into curr_lobby (pCount) values (2);
insert into players (username,rank,wpm,sID,lID) values (
    'testplayer1',
    1,
    60,
    '1a2b3c4d',
    1
);
insert into players (username,rank,wpm,sID,lID) values (
    'testplayer2',
    2,
    60,
    '9z8y7x6w',
    1
);
