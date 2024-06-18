// Envoi d'une requête GET /categories
// L'objet récupéré est dans la variable categories
fetch('http://localhost:5678/api/categories')
.then(response => response.json())
.then(data => {
    categories = data
    ajoutBoutonFiltre (categories, '.button-filter')
})
.catch(error => console.log(error))

// Envoi d'une requête GET /works 
// L'objet récupéré est dans la variable works
fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => { 
    works = data
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
    // Fonction pour gérer la couleur de sélection du bouton actif
    function changerCouleurBtnSelectionne(event) {
        document.querySelectorAll('.button-filter ul li button').forEach(button => {
            button.classList.remove('selected')
        })
        event.target.classList.add('selected')
    }
    // Création du bouton "Tous"
    const liButtonTous = document.createElement('li')
    const buttonTous = document.createElement('button')
    buttonTous.textContent = 'Tous'
    buttonTous.className = 'btn-tous selected'
    buttonTous.addEventListener('click', changerCouleurBtnSelectionne)
    liButtonTous.appendChild(buttonTous)
    ul.appendChild(liButtonTous)
    //-----------------------------------//
    categories.forEach(categorie => {
        const li = document.createElement("li")
        const button = document.createElement("button")
        button.textContent = categorie.name
        button.className = 'btn-filter'
        button.addEventListener('click', changerCouleurBtnSelectionne)
        ul.appendChild(li)
        li.appendChild(button)
    })
}

// Fonction permettant de filtrer les réponses de la requête GET /works
function filtreRequeteWorks (works) {
    document.querySelectorAll('.btn-filter').forEach(button => {
        button.addEventListener('click', () => {
            const categorieName = button.textContent
            const filtreWorks = works.filter(work => 
                work.category.name === categorieName)
            afficherFiltreGallery(filtreWorks, ".gallery")
        })
    })
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
    })
}

// Fonction permettant d'afficher l'ensemble de la galerie dans la page HTML
// en cliquant sur le bouton Tous 
function filtreBtnTous (works) {
    const eventBtnTous = document.querySelector('.btn-tous')
    eventBtnTous.addEventListener('click', function() {
    displayGallery(works, ".gallery")
    })
}

// Sélectionnez tous les boutons de filtre
const boutons = document.querySelectorAll('.button-filter ul li');

// Parcourez chaque bouton
for (let i = 0; i < boutons.length; i++) {
    // Ajoutez un écouteur d'événements de clic à chaque bouton
    boutons[i].addEventListener('click', function() {
        // Retirez la classe 'selected' de tous les boutons
        for (var j = 0; j < boutons.length; j++) {
            boutons[j].classList.remove('selected');
        }
        // Ajoutez la classe 'selected' au bouton cliqué
        this.classList.add('selected');
    });
}

