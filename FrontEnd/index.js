// Récupération des works depuis l’API
const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
// Tableau pour stocker les éléments de work
const figures = [];
// Div contenant les boutons de filtre
const filterDiv = document.querySelector(".filter");
// Boutons de filtre
const filterButtons = document.querySelectorAll(".filter button");
// Tableau des catégories uniques
const categories = works.map((work) => work.category.name);
const uniqueCategories = [...new Set(categories)];
// Galerie d’images
const gallery = document.querySelector(".gallery");
// Fonction pour créer les balises d’une figure (work) dans le DOM
function createFigure(work) {
  const figure = document.createElement("figure");
  const imageUrl = document.createElement("img");
  imageUrl.src = work.imageUrl;
  const title = document.createElement("figcaption");
  title.textContent = work.title;
  figure.appendChild(imageUrl);
  figure.appendChild(title);
  return figure;
}
// Fonction pour filtrer les works par catégorie
function filterWorksByCategory(category) {
  // Effacer la galerie actuelle
  gallery.innerHTML = "";
  // Filtrer les works en fonction de la catégorie sélectionnée
  const filteredWorks = works.filter(
    (work) => category === "Tous" || work.category.name === category
  );
  // Générer et afficher les figures correspondantes
  filteredWorks.forEach((work) => {
    const figure = createFigure(work);
    gallery.appendChild(figure);
  });
}
// Fonction pour ajouter les boutons de catégorie
function addCategoryButtons(categories) {
  // Bouton pour afficher toutes les catégories
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("btn"); // Ajout de la classe CSS
  allButton.addEventListener("click", () => filterWorksByCategory("Tous"));
  filterDiv.appendChild(allButton);
  // Ajout des boutons pour chaque catégorie unique
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("btn"); // Ajout de la classe CSS
    button.addEventListener("click", () => filterWorksByCategory(category));
    filterDiv.appendChild(button);
  });
}
// Ajout des boutons de catégorie
addCategoryButtons(uniqueCategories);
// Affichage de tous les travaux, à chaque work tu créés une card (itération jusquà la fin du tableau, principe du for each)
works.forEach((work) => {
  const figure = createFigure(work);
  gallery.appendChild(figure);
});