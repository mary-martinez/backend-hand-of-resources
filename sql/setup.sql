-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists members;

CREATE table members (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  nickname VARCHAR,
  age INTEGER NOT NULL
);

INSERT INTO members (name, nickname, age) VALUES
('Marty', null, 31),
('Mary', null, 31),
('Olivia', 'LiviLou', 1),
('Melody', 'Pillowdy', 8),
('Tempo', 'Mento', 8);