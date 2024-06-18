// Fonction pour traiter le formulaire Login
// Le code spécifié doit être exécuté lorsque le page login.html est entièrement chargée
document.addEventListener("DOMContentLoaded", () => {
    const formulaireLogin = document.querySelector(".formulaire-login")
    formulaireLogin.addEventListener("submit",(event) => {
        event.preventDefault()

        // Création d'un objet contenant les valeurs du formulaire login. 
        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        }

        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(login)

       // Envoi d'une requête POST /users/login
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: chargeUtile
        })
        .then(response => response.json())
        .then(data => {
            const token = data.token

            // Condition en cas de bon ou mauvais email ou mot de passe
            if (token === undefined) {
                alert ("Mot de passe ou Adresse mail incorrect.")
            } else {
                sessionStorage.setItem('token', token) // Stockage du token dans le sessionStorage
                window.location.href = "index.html" // Redirection vers la page d'accueil si le login est réussi
            }
        })
        .catch(error => {
            console.log(error)
        })
    })
})
