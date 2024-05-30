document.addEventListener("DOMContentLoaded", () => {
const loginLogout = document.getElementById("login-logout")
if(sessionStorage.getItem("token")) {
    loginLogout.textContent = "logout"
    loginLogout.addEventListener("click", (e) => {
        sessionStorage.clear()
        /*window.location.reload()*/
    });
}


const openModal = document.querySelector(".btn-open-modal")
openModal.addEventListener("click", () => {
    const modal = document.getElementById("modal1")
    modal.setAttribute("style", "display: null")
    console.log("je clique sur le bouton modale")
})

const closeModal = document.querySelector(".btn-close-modal")
closeModal.addEventListener("click", () => {
    const modal = document.getElementById("modal1")
    modal.setAttribute("style", "display: none")
    console.log("Je clique sur le bouton de fermeture de la modale")
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
        figure.appendChild(img)

        gallery.appendChild(figure)
    });
}
});