
import fs from 'fs';
import articles from '../data/articles.js';

function deleteDateField() {
    const cleanedArticles = articles.map((article) => {
        const { date, ...rest } = article;
        return rest;
    });

    const fileContent = `export default ${JSON.stringify(cleanedArticles, undefined, 2)}`;

    fs.writeFile('./data/articles.js', fileContent, (err) =>{
      if (err) {
        console.error('Erreur', err);
      } else {
        console.log('Champ "date" supprimé avec succès');
      }
    });
  }

  deleteDateField();





