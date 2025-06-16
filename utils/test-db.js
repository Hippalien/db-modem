import knex from '../db.js';

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


