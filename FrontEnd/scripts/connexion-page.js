// RECUPERATION DES ELEMENTS
const inputMail = document.getElementById("input-mail")
const inputPassword = document.getElementById("input-password")
const connexionButton = document.getElementById("connexion-button")
const inputMailBlock = document.getElementById("input-mail-block")

// LISTENER DU BOUTON DE OCNNEXION
connexionButton.addEventListener("click", function() {
    let inputMailValue = inputMail.value 
    let inputPasswordValue = inputPassword.value
    const messageMailError = document.getElementById("display-none-mail")
    const messagePasswordError = document.getElementById("display-none-password")

    if (inputMailValue === "sophie.bluel@test.tld") {
        try {
            messageMailError.id = ("display-none-mail")
        } catch {
        }
    } else {
        try {
            messageMailError.id = ("message-mail-error")
            inputMail.id = ("input-mail-error")
        } catch {
        }
    }

    if (inputPasswordValue === "S0phie") {
        try {
            messagePasswordError.id = ("display-none-password")
        } catch {
        }
    } else {
        try {
            messagePasswordError.id = ("message-password-error")
            inputPassword.id = ("input-password-error")
        } catch {
        }
    }

    if (inputMailValue === "sophie.bluel@test.tld" && inputPasswordValue === "S0phie") {
        this.onclick=document.location.href='index.html'
    } else {
        inputMail.innerText =""
        inputPassword.innerText = ""
    }
})


