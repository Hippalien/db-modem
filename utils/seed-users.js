import db from '../db.js';
import users from '../data/users.js';

async function seedTable() {
  try {
    await db('users').del();
    await db('users').insert(users);
    console.log('Users ajoutés');
  } catch (error) {
    console.error('Erreur', error);
  } finally {
    await db.destroy(); //ferma la connexion à la base de données
    console.log('Connexion à la db fermée');
  }
}
seedTable();