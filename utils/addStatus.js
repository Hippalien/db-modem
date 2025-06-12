import fs from 'fs';
import articles from '../data/articles.js';


function addStatusField() {
    const updatedArticles = articles.map((article) => {
        return { ...article, status: 'published' }; 
    });

    const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)}`;
    fs.writeFile('./data/articles.js', fileContent, (err) => {
        if (err) {
            console.error('Erreur', err);
        } else {
            console.log('Champ "status" ajouté avec succès');
        }
    });
}

addStatusField();