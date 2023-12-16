let modal = null

const openModal = function (e) {
    e.preventDefault()
    const target = document.getElementById("modal1")
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc")
    closeModal(e)
})

let crossBar = document.querySelector(".crossbar")
crossBar.addEventListener("click", closeModal)
let crossbar2 = document.querySelector(".crossbar2")
crossbar2.addEventListener("click", closeModal)

const modalWrapper = document.querySelector(".modal-wrapper")
const modalWrapper2 = document.querySelector(".modal-wrapper2")
const buttonAddPhoto = document.querySelector(".button-add-photo")
const previousArrow = document.querySelector(".previous-modal2")

buttonAddPhoto.addEventListener("click", function() {
    modalWrapper.style.display = "none"
    modalWrapper2.style.display = "flex"
})

previousArrow.addEventListener("click", function() {
    modalWrapper2.style.display = "none"
    modalWrapper.style.display = "flex"
})
