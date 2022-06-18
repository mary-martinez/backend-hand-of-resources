-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists members;
DROP table if exists foods;
DROP table if exists drinks;

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
('Tempo', 'Mento', 8),
('Fake', null, 100);

CREATE table foods(
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  origin VARCHAR,
  joy INTEGER
);

INSERT INTO foods (name, origin, joy) VALUES
('pizza', 'Italy', 7),
('sushi', 'Japan', 8),
('hot & sour soup', 'China', 7),
('hamburger', null, 6),
('grilled chicken', null, 5);

CREATE table drinks(
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  alcohol BOOLEAN NOT NULL,
  carbonated BOOLEAN
);

INSERT INTO drinks (name, alcohol, carbonated) VALUES
('water', false, false),
('coke', false, true),
('coconut water', false, true),
('wine', true, null),
('truly', true, true);
