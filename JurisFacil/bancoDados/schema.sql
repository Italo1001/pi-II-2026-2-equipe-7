CREATE TABLE area_direito (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE termo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    definicao_tecnica TEXT NOT NULL,
    explicacaoClara TEXT NOT NULL,
    area_direito_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    fonte VARCHAR(255),

    FOREIGN KEY (area_direito_id) REFERENCES area_direito(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE exemplo (
    id SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    termo_id INTEGER NOT NULL,

    FOREIGN KEY (termo_id) REFERENCES termo(id)
);

CREATE TABLE administrador (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);