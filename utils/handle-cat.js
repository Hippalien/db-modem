import articles from "../data/articles.js"
import fs from 'fs'; //permet de lire, écrire ou ajouter un contenu a un fichier, module natif Node js


function handleCat() {
  const catList = new Map(); //clef/valeur dans un tableau
  
articles.forEach(function(article) {
  console.log(article.category); //affiche la catégorie de l'article
  const cat = article.category; //récupère la catégorie de l'article
  if (cat && cat.id && cat.name) { //vérifie si la catégorie existe
    catList.set(cat.id, cat.name); //ajoute la catégorie à la liste
  }
}
);
  
const uniqueCat = Array.from(catList.entries()).map(function(entry) {
  return {
    id: entry[0],
    name: entry[1]
};
});



const fileContent = 'export default ' + JSON.stringify(uniqueCat, null, 2);


fs.writeFile('./data/categories.js', fileContent, function(err) { //callback , execute
  if (err) {
    console.error('Erreur', err);
  } else {
    console.log('Categories updated');
  }
});
}

handleCat();
