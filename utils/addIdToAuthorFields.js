import fs from 'fs';
import articles from '../data/articles.js';
import users from '../data/users.js';

function useUserId() {
    const updatedArticles = articles.map((article) => {
        const createdByUser = users.find(user => user.name === article.created_by);
        const updatedByUser = users.find(user => user.name === article.updated_by);
        return { ...article, 
        created_by: createdByUser ? createdByUser.id : null,
        updated_by: updatedByUser ? updatedByUser.id : null }; 
    });

    const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)}`;
    fs.writeFile('./data/articles.js', fileContent, (err) => {
        if (err) {
            console.error('Erreur', err);
        } else {
            console.log('Champ "created_by" et "updated_by" mis à jour avec succès');
        }
    });
}
useUserId();