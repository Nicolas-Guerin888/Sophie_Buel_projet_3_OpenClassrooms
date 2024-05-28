let works = []

// Envoi d'une requête GET à l'API via son URL
fetch('http://localhost:5678/api/works')


// Traitement de la promesse à la requête. Elle ensuite désérialiser si la promesse est tenue
.then(response => response.json())

// Traitement de la promesse résolue avec les données JSON. Le paramètre works reçoit les données JSON de la promesse résolue. 
.then(data => { 
    works = data
    displayGallery(works, ".gallery")
})
// Capture des erreurs potentielles si la requête n'aboutit pas en affichant un message dans la console
.catch(error => console.log(error))

// Utilisation de la méthode forEach pour itérer sur tous les éléments du tableau works
// work devient la variable des éléments courants de l'API
function displayGallery(works, selector){
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

// Blocs de code pour les boutons filtres //

// Bouton Tous //
const btnTous = document.querySelector('.btn-tous')
btnTous.addEventListener('click', function() {
    displayGallery(works, ".gallery")
console.log('Bouton tous cliqué')
})

// Bouton Objets // 
const btnObjets = document.querySelector('.btn-objets')
btnObjets.addEventListener('click', function() {
        const objetsFiltres = works.filter(function(work) {
            return work.category.name === "Objets";
        });
        console.log('bouton objets cliqué')
        displayGallery(objetsFiltres, ".gallery")
    })

// Bouton Appartements // 
const btnAppartements = document.querySelector('.btn-appartements')
btnAppartements.addEventListener('click', function() {
        const appartementsFiltres = works.filter(function(work) {
            return work.category.name === "Appartements"
        });
        console.log('bouton appartements cliqué')
        displayGallery(appartementsFiltres, ".gallery")
    })
    
// Bouton Hotels & Restaurants //
const btnHotelsRestaurants = document.querySelector('.btn-hotels\\&restaurants')
btnHotelsRestaurants.addEventListener('click', function() {
        const hotelRestoFiltre = works.filter(function(work) {
            return work.category.name === "Hotels & restaurants"
        });
        console.log('bouton Hotels&restaurants cliqué')
        displayGallery(hotelRestoFiltre, ".gallery")
    })
    


