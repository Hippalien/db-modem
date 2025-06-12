import articles from "../data/articles.js";
import categories from "../data/categories.js";
import users from "../data/users.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'; // permet de lire, écrire ou ajouter un contenu à un fichier

const idArticles = uuidv4();
console.log(idArticles);

function updateArticles() {
  const updatedArticles = articles.map((article) => {
    article.id = uuidv4();
    return article;
  });

  const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)}`;

  fs.writeFile('./data/articles.js', fileContent, (err) =>{
    if (err) {
      console.error('Erreur', err);
    } else {
      console.log('UUID mis à jour');
    }
  });
}

function updateCategories() {
  const updatedCategories = categories.map((cat) => {
    return {
      id: uuidv4(),
      name: cat.name
    };
  });

  const fileContent = `export default ${JSON.stringify(updatedCategories, undefined, 2)}`;

  fs.writeFile('./data/categories.js', fileContent, (err) => {
    if (err) {
      console.error('Erreur', err);
    } else {
      console.log('UUID mis à jour');
    }
  });
}


const idUsers = uuidv4();
console.log(idUsers);

function updateUsers() {
  const updatedUserId = users.map((users) => {
    users.id = uuidv4();
    return users;
  });

  const fileContent = `export default ${JSON.stringify(updatedUserId, undefined, 2)}`;

  fs.writeFile('./data/users.js', fileContent, (err) => {
    if (err) {
      console.error('Erreur', err);
    } else {
      console.log('UUID mis à jour');
    }
  });
}


updateUsers();
updateArticles();
updateCategories();


//stringify methode chaine de caract json donc contenu lisible
// methode + (PARAMETRES)
// export default = même format que dans articles.js
// fs.writefile méthode asynchrone 
//function qui fait que tu dois ajouter un uuid a chaque objet du fcihier articles 
//Realise un script qui te permet d'ajouter un uuid a chaque articles
// tu peux soit overwrite le fichier js, soit faire qu'il crée un fichier json" execute
 


