import db from '../db.js';
import categories from '../data/categories.js';

async function seedTable() {
  try {
    await db('categories').del();
    await db('categories').insert(categories);
    console.log('Catégories ajoutées');
  } catch (error) {
    console.error('Erreur', error);
  } finally {
    await db.destroy(); //ferma la connexion à la base de données
    console.log('Connexion à la db fermée');
  }
}
seedTable();