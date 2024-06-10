document.addEventListener("DOMContentLoaded", () => {

// Partie 1 : CHangement du bouton login / logout et changement pour mode édition
    {
        // Code pour changer le bouton d'accueil login en logout
        // et pour effacer le token de sessionStorage lorsque deconnexion
        const loginLogout = document.getElementById("login-logout")
        if(sessionStorage.getItem("token")) {
            loginLogout.textContent = "logout"
            loginLogout.addEventListener("click", (e) => {
                sessionStorage.clear()
            })
        
        // Code pour gestion des éléments (boutons filtres, bandeau noir, bouton modifier)
        // apparaissant et disparaissant en mode edition
        const modeEdition = document.querySelector('.mode-edition')
        modeEdition.setAttribute("style", "display: null")
        const buttonFilter = document.querySelector('.button-filter')
        buttonFilter.setAttribute("style", "display: none")
        const logoModifier = document.querySelector('.mes-projets-modifier i, .mes-projets-modifier p')
        logoModifier.setAttribute("style", "display: null" )
        const textModifier = document.querySelector('.mes-projets-modifier p')
        textModifier.setAttribute("style", "display: null" )

        }
    }
        
// Partie 2 : Gestion des modales
    {
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
    }


// Partie 3 : Affichage de la gallerie dans la modale 1 et fonction DELETE
    {
        // Code permettant l'affichage de la gallerie des works dans la modale 1
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
            // Ajout bouton "Garbage" et suppression du work dans le DOM et l'API
                const i = document.createElement("i")
                i.className = "fa-solid fa-trash-can"
                i.addEventListener("click", () => {
                    figure.remove()
                    deleteWorkAPI(work.id)
                    console.log(work.id)
            //************************************************* */
                })
                
                figure.appendChild(i)
                figure.appendChild(img)
                gallery.appendChild(figure)
            })
        }
    
        // Fonction permettant de récupérer le token et faire une requête DELETE 
        // auprès de l'API
        function deleteWorkAPI(id) {
            const token= sessionStorage.getItem("token")
            fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {'Authorization': 'Bearer ' + token}
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La requête DELETE n\'a pas abouti')
                }
                console.log(`Le Work avec l\'id ${id} a bien été effacer de l\'API`)

            })
            .catch(error => console.log(error))
        }
    }
        
// Partie 4 : Gestion des catégories dans la modale 2
    {
    // Bloc de code permettant d'afficher les catégories dans le menu déroulant 
    // de la modale 2 et de récupérer l'ID de la catégorie
        fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(data => {
            categories = data
            console.log(categories)
            ajoutOption (categories, '.categorie')
            recupIdCategorie()
        })
        .catch(error => console.log(error))

        function ajoutOption (categories, selector) {
            const select = document.querySelector(selector)
            select.innerHTML = ''

            const optionVide = document.createElement('option')
            optionVide.textContent = ''
            select.appendChild(optionVide)

            categories.forEach(categorie => {
                const option = document.createElement('option')
                option.textContent = categorie.name
                option.value = categorie.id
                select.appendChild(option)
            })
        }
    }
})

document.addEventListener("DOMContentLoaded", () => {
// Partie 5 : Gestion de l'ajout d'un nouveau work dans la gallerie
    {
        let image
        let titre
        let idCategorie
        const token= sessionStorage.getItem("token")

        // Modification de la couleur du bouton valider lorsque l'ensemble des champs sont remplis
        function modifierCouleurBtn () {
            if (image && titre && idCategorie) {
                validerFormulaire.style.backgroundColor = "#1D6154"
                validerFormulaire.disabled = false
            } else {
                validerFormulaire.style.backgroundColor = ""
                validerFormulaire.disabled = true
            }
        }
        
    // Bloc de code récupérant l'image dans la variable image et création d'une miniature dans le formulaire
        const btnPhotoNewWork = document.getElementById("btn-ajout-photo")
        btnPhotoNewWork.addEventListener("click", (event) => {
            event.preventDefault()
            const input = document.createElement("input")
            input.type = "file"
            input.accept = ".png, .jpg, .jpeg"
            input.style.display = "none"
            document.body.appendChild(input)    
            input.click()
            input.addEventListener("change", () => {
                let photo = input.files[0]
                image = photo
                const maxSize = 4 * 1024 * 1024

                if (photo.size > maxSize) {
                    alert("Veuillez sélectionner un fichier de moins de 4 Mo.")
                } else {
                    console.log("Photo ajoutée :", image)
                
                    // Création d'une miniature de la photo sélectionnée
                    let url = URL.createObjectURL(photo)
                    let img = document.createElement("img")
                    img.src = url
                    img.style.objectFit = "cover"
                    img.height = 169
                    const containerAjoutPhoto = document.querySelector(".container-ajout-photo")
                    let container = document.querySelector(".container-ajout-photo")
                    while (container.firstChild) {
                        container.removeChild(container.firstChild)
                    }
                    containerAjoutPhoto.appendChild(img)
                    modifierCouleurBtn()
                    //************************************************* */
                }
                document.body.removeChild(input)
            })
        })
        
    // Bloc de code récupérant le titre dans la variable titre
        const inputTitreNewWork = document.getElementById("title-new-work")
        inputTitreNewWork.addEventListener("change", () => {
                titre = inputTitreNewWork.value 
                console.log("Titre :", titre)
                modifierCouleurBtn()
            })

    // Bloc de code récupérant l'ID catégorie dans la variable idCategorie
        function recupIdCategorie() { 
            const ChampCategorie = document.getElementById("categorie-new-work")
            ChampCategorie.addEventListener("change", (event) => {
                idCategorie = event.target.value
                console.log("l'ID catégorie sélectionné est", idCategorie)
                modifierCouleurBtn()
            })
        }   
        idCategorie = recupIdCategorie() 

    // Bloc de code pour la gestion du bouton valider du formulaire de la modale 2
        const validerFormulaire = document.getElementById("btn-valider-new-work")
        validerFormulaire.addEventListener("click", (event) => {
            event.preventDefault()

            console.log("Vérification avant envoi :", { image, titre, idCategorie });

            if (!image || !titre || !idCategorie) {
                alert("Veuillez remplir tous les champs.")
                return
            }
        modifierCouleurBtn()
        

        // Création de le charge utile pour la requête POST 
        const chargeUtile = new FormData()
        chargeUtile.append("image", image)
        chargeUtile.append("title", titre)
        chargeUtile.append("category", idCategorie) 

        console.log("FormData à envoyer:", {
            image: image,
            title: titre,
            category: idCategorie
        })
            
        // Requête POST à l'API et gestion de la réponse
        fetch('http://localhost:5678/api/works', {
            method: "POST",
            headers: {"Authorization": "Bearer " + token},
            body: chargeUtile
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête POST n\'a pas abouti')
            }
            return response.json()
        })
        .then(data => {
            alert("Votre nouveau projet a été ajoutée avec succès !")
            console.log(data)
        })
        .catch(error => console.log(error))
        })

        // Modification de la couleur du bouton valider lorsque l'ensemble des champs sont remplis
        function modifierCouleurBtn () {
            if (image && titre && idCategorie) {
                validerFormulaire.style.backgroundColor = "#1D6154"
                validerFormulaire.disabled = false
            } else {
                validerFormulaire.style.backgroundColor = ""
                validerFormulaire.disabled = true
            }
        }
    }
})

