CREATE DATABASE yacht_data;

\c yacht_data;

CREATE TABLE yacht_param (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    Length_wl REAL NOT NULL,
    Beam_wl REAL NOT NULL,
    Draft REAL NOT NULL,
    Displacement REAL NOT NULL,
    Centre_of_Buoyance REAL NOT NULL,
    Prismatic_Coefficient REAL NOT NULL,
    Froude_Number REAL NOT NULL
);

CREATE TABLE yacht (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    param_id BIGSERIAL NOT NULL REFERENCES yacht_param (id),
    yacht_name VARCHAR(50)
);

INSERT INTO yacht_param (id, Length_wl, Beam_wl, Draft, Displacement, Centre_of_Buoyance, Prismatic_Coefficient, Froude_Number) 
VALUES (1, 10.06, 4, 1.6, 10000, -2.91, 0.56, 0.2875);

INSERT INTO yacht (id, param_id, yacht_name) VALUES (1, 1, 'standfast1');
INSERT INTO yacht (id, param_id, yacht_name) VALUES (2, 1, 'standfast2');

SELECT * FROM yacht 
JOIN yacht_param ON yacht.param_id = yacht_param.id;