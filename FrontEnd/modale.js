document.addEventListener("DOMContentLoaded", () => {
    const loginLogout = document.getElementById("login-logout")
    if(sessionStorage.getItem("token")) {
        loginLogout.textContent = "logout"
        loginLogout.addEventListener("click", (e) => {
            sessionStorage.clear()
        })
        const modeEdition = document.querySelector('.mode-edition')
        modeEdition.setAttribute("style", "display: null")
        const buttonFilter = document.querySelector('.button-filter')
        buttonFilter.setAttribute("style", "display: none")
        const logoModifier = document.querySelector('.mes-projets-modifier i, .mes-projets-modifier p')
        logoModifier.setAttribute("style", "display: null" )
        const textModifier = document.querySelector('.mes-projets-modifier p')
        textModifier.setAttribute("style", "display: null" )

    
   
// Code pour gérer l'ouverture de la modale au click du bouton modifier
const openModal = document.querySelector(".btn-open-modal")
openModal.addEventListener("click", () => {
    const modal = document.getElementById("modal1")
    modal.setAttribute("style", "display: null")
    console.log("je clique sur le bouton modale")
})

// Code pour gérer la fermeture de la modale 1 au click de la croix
const closeModal = document.querySelector(".btn-close-modal")
closeModal.addEventListener("click", () => {
    const modal = document.getElementById("modal1")
    modal.setAttribute("style", "display: none")
})

// Code pour passer de la modale 1 à la modale 2
const openModal2 = document.querySelector(".open-modal2")
openModal2.addEventListener("click", () => {
    const modal = document.getElementById("modal1")
    modal.setAttribute("style", "display: none")
    const modal2 = document.getElementById("modal2")
    modal2.setAttribute("style", "display: null")
    console.log("Je clique sur le bouton d'ouverture de la modale 2")
})

// Code pour retourner de la modale 2 à la modale 1
const returnModal1 = document.querySelector(".btn-retour-modal1")
returnModal1.addEventListener("click", () => {
    const modal2 = document.getElementById("modal2")
    modal2.setAttribute("style", "display: none")
    const modal = document.getElementById("modal1")
    modal.setAttribute("style", "display: null")
    console.log("Je clique sur le bouton de retour vers la modale 1")
})

// Code pour gérer la fermeture de la modale 2 au click de la croix
const closeModal2 = document.querySelector(".btn-close-modal2")
closeModal2.addEventListener("click", () => {
    const modal2 = document.getElementById("modal2")
    modal2.setAttribute("style", "display: none")
    console.log("Je clique sur le bouton de fermeture de la modale 2")
})

// Code pour gérer la fermeture des fenêtre modales au click à l'extérieur
// de la modale
const modal = document.getElementById("modal1")
const modal2 = document.getElementById("modal2")
document.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none"
    }
    if (event.target == modal2) {
        modal2.style.display = "none"
    }
})


fetch('http://localhost:5678/api/works')
.then(response => response.json())
.then(data => { 
    works = data
    displayGallery(works, ".gallery-modal")
})
.catch(error => console.log(error))

function displayGallery(works, selector){
    const gallery = document.querySelector(selector)
    gallery.innerHTML = ''

    works.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src = work.imageUrl
        img.alt = work.title

        const i = document.createElement("i")
        i.className = "fa-solid fa-trash-can"
        /*i.addEventListener("click", () => {
            // Fonctionnalité pour supprimer l'image
            figure.remove();
        })*/


        figure.appendChild(i)
        figure.appendChild(img)
        gallery.appendChild(figure)
    });
    }}
})