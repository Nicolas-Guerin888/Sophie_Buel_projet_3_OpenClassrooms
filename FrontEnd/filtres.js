// Envoi d'une requête GET /categories
// L'objet récupéré est dans la variable categories
fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(data => {
    categories = data
    console.log(categories)
    ajoutBoutonFiltre (categories, '.button-filter')
})
.catch(error => console.log(error))

// Envoi d'une requête GET /works 
// L'objet récupéré est dans la variable works
fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => { 
    works = data
    console.log(works)
    filtreRequeteWorks (works)
    afficherFiltreGallery(works, ".gallery")
    filtreBtnTous (works)
})
.catch(error => console.log(error))


// Fonction permettant d'afficher des boutons en fonction des catégories. 
function ajoutBoutonFiltre (categories, selector) {
    const buttonFilter = document.querySelector(selector) 
    buttonFilter.innerHTML = ''
    const ul = document.createElement('ul')
    buttonFilter.appendChild(ul)
    // Création du bouton "Tous"
    const liButtonTous = document.createElement('li')
    const buttonTous = document.createElement('button')
    buttonTous.textContent = 'Tous'
    buttonTous.className = 'btn-tous'
    liButtonTous.appendChild(buttonTous)
    ul.appendChild(liButtonTous)
    //-----------------------------------//
    categories.forEach(categorie => {
        const li = document.createElement("li")
        const button = document.createElement("button")
        button.textContent = categorie.name
        button.className = 'btn-filter'
        ul.appendChild(li)
        li.appendChild(button)
    })
}

// Fonction permettant de filtrer les réponses de la requête GET /works
function filtreRequeteWorks (works) {
    document.querySelectorAll('.btn-filter').forEach(button => {
        button.addEventListener('click', () => {
            const categorieName = button.textContent;
            const filtreWorks = works.filter(work => 
                work.category.name === categorieName);
            console.log(filtreWorks);
            afficherFiltreGallery(filtreWorks, ".gallery");
        });
    });
}

// Fonction permettant d'afficher les éléments de galerie dans la page HTML
function afficherFiltreGallery(works, selector){
    const gallery = document.querySelector(selector)
    gallery.innerHTML = ''
    works.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = work.imageUrl
        img.alt = work.title
        figure.appendChild(img)
        const figureCaption = document.createElement("figcaption")
        figureCaption.textContent = work.title
        figure.appendChild(figureCaption)
        gallery.appendChild(figure)
    });
}

// Fonction permettant d'afficher l'ensemble de la galerie dans la page HTML
// en cliquant sur le bouton Tous 
function filtreBtnTous (works) {
    const eventBtnTous = document.querySelector('.btn-tous')
    eventBtnTous.addEventListener('click', function() {
    displayGallery(works, ".gallery")
console.log('Bouton tous cliqué')
})
}
