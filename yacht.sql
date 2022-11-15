CREATE DATABASE yacht_data;

\c yacht_data;

CREATE TABLE yacht (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    yacht_name VARCHAR(50) NOT NULL,
    length_wl REAL NOT NULL,
    beam_wl REAL NOT NULL,
    draft REAL NOT NULL,
    displacement REAL NOT NULL,
    centre_of_buoyancy REAL NOT NULL,
    prismatic_coefficient REAL NOT NULL,
    velocity REAL NOT NULL,
    resistance REAL
);