CREATE DATABASE yacht_data;

\c yacht_data;

CREATE TABLE yacht_param (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    L REAL NOT NULL,
    B REAL NOT NULL,
    T REAL NOT NULL,
    D REAL NOT NULL,
    Lbc REAL NOT NULL,
    Cp REAL NOT NULL,
    Fn REAL NOT NULL
);

CREATE TABLE yacht (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    param_id BIGSERIAL NOT NULL REFERENCES yacht_param (id),
    yacht_name VARCHAR(50)
);

INSERT INTO yacht_param (id, L, B, T, D, Lbc, Cp, Fn) VALUES (1, 10.06, 4, 1.6, 10000, -2.91, 0.56, 0.2875);

INSERT INTO yacht (id, param_id, yacht_name) VALUES (1, 1, 'standfast1');
INSERT INTO yacht (id, param_id, yacht_name) VALUES (2, 1, 'standfast2');