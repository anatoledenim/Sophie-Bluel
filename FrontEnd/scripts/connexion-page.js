// RECUPERATION DES ELEMENTS
// const formValue = document.querySelector("form")
const inputMail = document.getElementById("input-mail")
const inputPassword = document.getElementById("input-password")
const connexionButton = document.getElementById("connexion-button")
const inputMailBlock = document.getElementById("input-mail-block")
let inputMailValue = inputMail.value 
let inputPasswordValue = inputPassword.value
const messageConnexionError = document.getElementById("display-none-connexion")

// FONCTION POUR ENVOYER LE USER ET LE PASSWORD
async function fetchPostElementConnexion(apiPoint, user, password) {
    const response = await fetch(apiPoint, {
        method: 'POST',
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            "email": user,
            "password": password
        })
    })
    if (response.status === 200) {
        console.log(response.status, "200")
        let json = await response.json()
        let token = await json.token
        console.log(token)
        localStorage.setItem("authentificationToken", token)
        redirectionPage()
    } else if (response.status === 404) {
        messageConnexionError.id = "message-connexion-error"
    } else if (response.status === 401) {
        console.log(response.status, "401")
        messageConnexionError.id = "message-connexion-error"
    } else {
        alert("erreur inconnue")
    } 
}  

// FONCTION REDIRECTION
function redirectionPage() {
    window.location.href="index.html"
}

// LISTENER DU BOUTON DE CONNEXION
connexionButton.addEventListener("click", function() {
    fetchPostElementConnexion('http://localhost:5678/api/users/login', inputMailValue, inputPasswordValue)
})



