// RECUPERATION DES ELEMENTS
const inputMail = document.getElementById("input-mail")
const inputPassword = document.getElementById("input-password")
const connexionButton = document.getElementById("connexion-button")
const inputMailBlock = document.getElementById("input-mail-block")

// FONCTION POUR ENVOYER LE USER ET LE PASSWORD
async function fetchPostElementConnexion(apiPoint, user, password) {
    const fetcher = await fetch(apiPoint, {
        method: 'POST',
        headers: { "accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            "email": user,
            "password": password
        })
    })
    let json = await fetcher.json()
    let token = await json.token
    localStorage.setItem("authentificationToken", token)
    redirectionPage()
} 

// FONCTION REDIRECTION
function redirectionPage() {
    window.location.href="index.html"
}

// LISTENER DU BOUTON DE CONNEXION
connexionButton.addEventListener("click", function() {
    let inputMailValue = inputMail.value 
    let inputPasswordValue = inputPassword.value
    const messageConnexionError = document.getElementById("display-none-connexion")
    const user = "sophie.bluel@test.tld"
    const password = "S0phie"

    if (inputMailValue !== user) {
        inputMail.id = ("input-mail-error")
    }

    if (inputPasswordValue !== password) {
        inputPassword.id = ("input-password-error")
    }

    if (inputMailValue === user && inputPasswordValue === password) {
        fetchPostElementConnexion('http://localhost:5678/api/users/login', inputMailValue, inputPasswordValue)
    } else {
        messageConnexionError.id = "message-connexion-error"
    }
})


