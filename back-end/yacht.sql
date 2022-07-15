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