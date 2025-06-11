import knex from './db.js';

async function testConnection() {
  try {
    const rows = await knex('test_table').select('*');
    console.log('Contenu de la table test :', rows);
  } catch (error) {
    console.error('Erreur lors de la connexion à la base :', error);
  } finally {
    await knex.destroy(); // ferme la connexion proprement
  }
}

testConnection();


// exemple pour créer une table de test
// CREATE TABLE articles (
//   id SERIAL PRIMARY KEY,
//   title VARCHAR(50) NOT NULL,
//   content TEXT NOT NULL,
//   category VARCHAR(20) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   image TEXT NOT NULL,
//   author VARCHAR(50) NOT NULL
//   status BOOLEAN DEFAULT FALSE
// );


// CREATE TABLE categories (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(50) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   email VARCHAR(200) NOT NULL UNIQUE,
//   password VARCHAR(200) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );