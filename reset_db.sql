-- INITIALIZE TABLE
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL NOT NULL,
  username VARCHAR(200) NOT NULL UNIQUE,
  email VARCHAR(200) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  firstname VARCHAR(200),
  lastname VARCHAR(200),
  createdAt DATE NOT NULL DEFAULT NOW(),
  updatedAt Date NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Photos (
  id SERIAL NOT NULL,
  filepath TEXT NOT NULL,
  userId INT,
  tags TEXT[],
  createdAt DATE NOT NULL DEFAULT NOW(),
  PRIMARY KEY(id),
  CONSTRAINT fk_photo
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- DUMMY DATA
INSERT INTO Users(username, password, firstname, lastname, email)
VALUES ('magsu', '1234', 'Martin', 'Magsombol', 'martinremags@gmail.com');

INSERT INTO Users(username, password, firstname, lastname, email)
VALUES ('jejejao', '4321', 'Jesse', 'Gao', 'jessegao12@gmail.com');

INSERT INTO Users(username, password, firstname, lastname, email)
VALUES ('y0h0n', 'chickenpie', 'Johann', 'Banta', 'johannbanta@gmail.com');

INSERT INTO Users(username, password, firstname, lastname, email)
VALUES ('shawnesteem', 'peachmangopie', 'Shawn', 'Agustin', 'shawnagustin97@gmail.com');

INSERT INTO Users(username, password, firstname, lastname, email)
VALUES ('aercies', 'liquids', 'Anthony', 'Nguyen', 'anguy179@gmail.com');
