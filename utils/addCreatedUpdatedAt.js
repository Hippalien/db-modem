import fs from 'fs';
import articles from '../data/articles.js';
import categories from '../data/categories.js';
import users from '../data/users.js';

function addDateField(array, fileName) {
  const now = new Date().toISOString();
  const updated = array.map((item) => {
    return { ...item, created_at : now, updated_at : null }; 
  });
  const fileContent = `export default ${JSON.stringify(updated, undefined, 2)}`;
  const path = `./data/${fileName}.js`;
   
  fs.writeFile(path, fileContent, (err) => {
    if (err) {
      console.error('Erreur', err);
    } else {
      console.log('Champs "Date" ajouté avec succès');
    }
  });
}

addDateField(articles, 'articles');
addDateField(categories, 'categories');
addDateField(users, 'users');
