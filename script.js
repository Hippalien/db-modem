import articles from "./data/articles.js"
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'; //permet de lire, écrire ou ajouter un contenu a un fichier, module natif Node js

const id = uuidv4();
console.log(id);


function addUuid() {
  const updatedArticles = articles.map(function(article) {
    article.id = uuidv4();
    return article;
  });

const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)};`;

fs.writeFile('./data/articles.js', fileContent, function(err) { //callback , execute
  if (err) {
    console.error('Erreur', err);
  } else {
    console.log('UUID updated');
  }
});
}

addUuid();

//stringify methode chaine de caract json donc contenu lisible
// methode + (PARAMETRES)
// export default = même format que dans articles.js
// fs.writefile méthode asynchrone 

//function qui fait que tu dois ajouter un uuid a chaque objet du fcihier articles 
//Realise un script qui te permet d'ajouter un uuid a chaque articles
// tu peux soit overwrite le fichier js, soit faire qu'il crée un fichier json" execute
 


