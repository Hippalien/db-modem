import fs from 'fs';
import articles from '../data/articles.js';

function deleteButtonField() {
  const cleanedArticles = articles.map((article) =>{
    const { button, ...rest } = article;
    return rest;
  });

  const fileContent = `export default ${JSON.stringify(cleanedArticles, undefined, 2)}`;

  fs.writeFile('./data/articles.js', fileContent, function(err) {
    if (err) {
      console.error('Erreur', err);
    } else {
      console.log('Champ "button" supprimé avec succès');
    }
  });
}

deleteButtonField();



