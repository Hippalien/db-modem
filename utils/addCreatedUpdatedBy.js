import fs from 'fs';
import articles from '../data/articles.js';
import users from '../data/users.js';

function addAuthorField() {
  const updatedArticles = articles.map((article) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    return { ...article, created_by: randomUser.name, updated_by: randomUser.name };
  });

  const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)}`;
   
  fs.writeFile('./data/articles.js', fileContent, (err)=>{
    if (err) {
      console.error('Erreur', err);
    } else {
      console.log('Champs "author" ajouté avec succès');
    }
  });
}

addAuthorField();


