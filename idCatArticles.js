import articles from "./data/articles.js"
import categories from "./data/categories.js";
import fs from 'fs'; //permet de lire, écrire ou ajouter un contenu a un fichier, module natif Node js


function catObjectArticles(){
const nameToId = {};
  categories.forEach((cat) => {
    nameToId[cat.name] = cat.id;
  });

  const updatedArticles = articles.map((article) => {
    const cat = article.category;
    if (cat && cat.name && nameToId[cat.name]) {
      article.category = nameToId[cat.name]; } else {
        console.warn("Catégorie inconnue", article.title);
      }
      return article;
    });
  
  const fileContent = `export default ${JSON.stringify(updatedArticles, undefined, 2)}`;

  fs.writeFile("./data/articles.js", fileContent, function(err) {
    if (err) {
      console.error("Erreur", err);
    } else {
      console.log("Articles mis à jour");
    }
  });
}

catObjectArticles();

