import db from '../db.js';
import articles from '../data/articles.js';

async function seedTable() {
  try {
    await db('articles').del();
    await db('articles').insert(articles);
    console.log('Article ajoutés');
  } catch (error) {
    console.error('Erreur', error);
  } finally {
    await db.destroy(); //ferma la connexion à la base de données
    console.log('Connexion à la db fermée');
  }
}
seedTable();