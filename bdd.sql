CREATE TYPE article_status AS ENUM ('published', 'draft');

CREATE TABLE categories (
id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
name VARCHAR(50) NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP
);

CREATE TABLE users (
id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP 
);

CREATE TABLE articles (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
title VARCHAR(100) NOT NULL,
status article_status NOT NULL,
category_id UUID REFERENCES categories(id),
image TEXT NOT NULL,
content TEXT NOT NULL,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP, 
created_by TEXT REFERENCES users(id),
updated_by TEXT REFERENCES users(id)
);

CREATE TRIGGER handle_article_updated_at 
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE PROCEDURE moddatetime(updated_at);

CREATE TRIGGER handle_updated_at 
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE PROCEDURE moddatetime(updated_at);
