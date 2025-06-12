import fs from 'fs';
import articles from '../data/articles.js';

function addDateField() {
  const now = new Date().toISOString();
  const updatedArticles = articles.map((article) => {
    return { ...article, created_at : new Date().toISOString(), updated_at : null }; 
  });

  const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)}`;
   
  fs.writeFile('./data/articles.js', fileContent, function(err) {
    if (err) {
      console.error('Erreur', err);
    } else {
      console.log('Champs "Date" ajouté avec succès');
    }
  });
}

addDateField();
