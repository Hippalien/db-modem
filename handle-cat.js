import articles from "./data/articles.js"
import fs from 'fs'; //permet de lire, écrire ou ajouter un contenu a un fichier, module natif Node js

const cat = handleCat();
console.log(cat);

function handleCat() {
  const catList =
  [...new Set( // Set permet de créer un tableau avec des valeurs uniques
    // map permet de créer un tableau avec les valeurs de la propriété category de chaque article
    articles.map(function(article) {
      return article.category;
    })
  )];

 ;
  

const fileContent = `export default ${JSON.stringify(catList, undefined, 2)};`;

fs.writeFile('./data/categories.js', fileContent, function(err) { //callback , execute
  if (err) {
    console.error('Erreur', err);
  } else {
    console.log('Categories updated');
  }
});
}

handleCat();
