// Fonction pour traiter le formulaire Login
document.addEventListener("DOMContentLoaded", () => {
    const formulaireLogin = document.querySelector(".formulaire-login")
    formulaireLogin.addEventListener("submit",(event) => {
        event.preventDefault()
        console.log("test")
        // Création d'un objet contenant les valeurs du formulaire login. 
        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        }

        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(login)
        //Appel de la fonction fetch avec comme deuxième argument un objet de configuration
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: chargeUtile
        })
        .then(response => response.json())
        .then(data => {
            const token = data.token
            console.log(token)
            sessionStorage.setItem('token', token)
            window.location.href = "index.html"
        })
        .catch(error => {
            console.log(error)
            alert ("Mot de passe ou Adresse mail incorrect.")
        })
    });
});  
