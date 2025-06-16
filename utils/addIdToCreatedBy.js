import fs from 'fs';
import articles from '../data/articles.js';
import users from '../data/users.js';

function useUserId() {
    const updatedArticles = articles.map((article) => {
        const user = users.find(user => user.username === article.created_by);
        return { ...article, created_by: user ? user.id : null }; 
    });

    const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)}`;
    fs.writeFile('./data/articles.js', fileContent, (err) => {
        if (err) {
            console.error('Erreur', err);
        } else {
            console.log('Champ "createdBy" mis à jour avec succès');
        }
    });
}
useUserId();