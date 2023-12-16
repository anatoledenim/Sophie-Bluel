// // RECUPERER UNE ADRESSE AVEC FETCH
async function fetchGetElements(apiPoint) {
    const response = await fetch(apiPoint);
    return await response.json();
}

// // AFFICHER LES BOUTONS DE FILTRE 
async function buildFilter(filterBar) {
    const categories = await fetchGetElements("http://localhost:5678/api/categories");
    const filterBarTousP = document.createElement("button");
    filterBarTousP.setAttribute("id", "filter-button")
    filterBarTousP.innerText = "Tous";
    filterBar.appendChild(filterBarTousP)
    
    Array.from(categories).forEach((category) => {
        let filterBarButton = document.createElement("button");
        filterBarButton.innerText = category.name;
        filterBarButton.dataset.categoryId = category.id
        filterBarButton.setAttribute("id", "filter-button")
        filterBar.appendChild(filterBarButton)

        filterBarTousP.addEventListener("click", function() {
            applyFilterTous(category.id)
        })
        filterBarButton.addEventListener("click", function() {
            applyFilter(category.id)
        })
    })
}

// // APPLIQUER LE FILTRE TOUS SUR LA PAGE
function applyFilterTous() {
    const galleryItem = Array.from(document.getElementsByClassName("gallery-item"))
    galleryItem.forEach((element) => {
        let elementCategoryId = parseInt(element.dataset.categoryId)
        if (elementCategoryId >= 0) {
            element.classList.remove("display-none")
        }
    });
}

// // APPLIQUER LES FILTRES SUR LA PAGE (OBJETS, APPARTEMENTS, H&R)
function applyFilter(filterCategoryId) {
    const galleryItem = Array.from(document.getElementsByClassName("gallery-item"))
    galleryItem.forEach((element) => {
        let elementCategoryId = parseInt(element.dataset.categoryId)
        if (elementCategoryId !== filterCategoryId) {
            element.classList.add("display-none")
        } else {
            element.classList.remove("display-none")
        }
    });
}

// // FONCTION POUR SUPPRIMER DES ELEMENTS
const fetchDeleteElements = async function(id) {
    let token = window.localStorage.getItem("token")
        await fetch ("http://localhost:5678/api/works/" + id, { 
            method: 'DELETE',
            headers: {
                "accept": "*/*",
                "Authorization": "Bearer " + token,
            }
    })
        console.log("la suppression à bien eu lieu")
}

// FONCTION POUR AFFICHER LES CATEGORIES MENU DEROULANT
async function showCategoriesInput() {
    const categories = await fetchGetElements("http://localhost:5678/api/categories")
    const categoriesNames = categories.map(categories => categories.name)
    const categoriesId = categories.map(categories => categories.id)
    let inputCategory = document.querySelector(".input-category-choice")
    
    let arrayCategories = Array.from(categories)
    for (i = 0; i < arrayCategories.length; i++) {
        let option = document.createElement("option")
        option. classList.add("option-select")
        option.innerText = categoriesNames[i];
        option.setAttribute("value", categoriesId[i])
        inputCategory.appendChild(option)
    }
}

// VALIDATION DE FORMULAIRE
function checkForm() {
    let inputFile = document.querySelector(".input-file-button").files.length > 0
    let inputText = document.querySelector(".input-title-text").value.length > 0
    let inputCategory = document.querySelector(".input-category-choice").value !== ""

    if (inputFile === true && inputText === true && inputCategory === true) {
        try {
            let validateButton = document.querySelector(".disabled-button")
            validateButton.classList.remove("disabled-button")
            validateButton.classList.add("unabled-button")
            validateButton.disabled = false

            validateButton.addEventListener("click", function() {
                if (checkForm()) {
                    fetchPostElement("http://localhost:5678/api/works")
                }
            })
        } catch {}
            return true
    } else {
        try {
            let validateButton = document.querySelector(".unabled-button")
            validateButton.classList.remove("unabled-button")
            validateButton.classList.add("disabled-button")
            validateButton.disabled = true
        } catch {}
        return false
    }
}

async function fetchPostElement(apiPoint) {
    let token = window.localStorage.getItem("token")
    let inputFileVisualizerImg = document.querySelector(".input-file-visualizer-img")
    let title = document.querySelector(".input-title-text")
    let category = document.querySelector(".input-category-choice")

    await fetch(apiPoint, {
        method: "POST",
        headers: { "Authorization": "Bearer " + token },
        body: {
            image: inputFileVisualizerImg.src,
            title: title.value,
            category: category.value
        },
    })
}

// AFFICHER LES ELEMENTS SUR LE BLOC PRINCIPAL
async function buildPage() {
    const works = await fetchGetElements("http://localhost:5678/api/works");

    const filterBar = document.querySelector(".filter-bar");
    buildFilter(filterBar)

    const worksName = works.map(works => works.title);
    const worksImage= works.map(works => works.imageUrl);
    const categoryId = works.map(works => works.categoryId);
    const id = works.map(works => works.id)
    const divGallery = document.querySelector(".gallery");
    const modalGrid = document.querySelector(".modal-grid")
    const divTrash = document.querySelector(".div-trash")

    for (i = 0; i < works.length; i++) {
        let figureHTML = document.createElement("figure");
        figureHTML.dataset.categoryId = categoryId[i];
        figureHTML.dataset.id = id[i];
        figureHTML.classList.add("gallery-item")
        let imageGallery = document.createElement("img");
        imageGallery.src = worksImage[i];
        let nameGallery = document.createElement("p");
        nameGallery.innerText = worksName[i];
        divGallery.appendChild(figureHTML);
        figureHTML.appendChild(imageGallery);
        figureHTML.appendChild(nameGallery);
    }

    for (i = 0; i < works.length; i++) {
        let figureModal = document.createElement("figure");
        figureModal.dataset.categoryId = categoryId[i];
        figureModal.dataset.id = id[i];
        figureModal.id = "figure-modal"
        let imageGalleryModal = document.createElement("img");
        imageGalleryModal.src = worksImage[i];
        modalGrid.appendChild(figureModal);
        figureModal.appendChild(imageGalleryModal);

        let backgroundTrash = document.createElement("div")
        backgroundTrash.dataset.categoryId = categoryId[i];
        backgroundTrash.dataset.id = id[i];
        backgroundTrash.classList.add("background-trash")
        let linkTrash = document.createElement("a")
        linkTrash.id = "link-trash"
        let trash = document.createElement("img")
        trash.classList.add("trash")
        trash.src = "../FrontEnd/assets/images/Vector (3).png"
        divTrash.appendChild(backgroundTrash)
        backgroundTrash.appendChild(linkTrash)
        linkTrash.appendChild(trash)
    }

    let h2Project = document.getElementById("h2-project")
    const token = window.localStorage.getItem("token")
    if (window.localStorage.getItem("token") === token && window.localStorage.getItem("token") !== null) {
        let divBlack = document.getElementById("div-black-hidden")
        divBlack.id = ("div-black")
        divBlack.id 
        let login = document.getElementById("login")
        let logout = document.getElementById("display-none")
        login.id = ("display-none")
        logout.id = ("logout")
        filterBar.classList.add("display-none")
        h2Project.classList.add("padding-bottom")
        let divEditionProject = document.getElementById("div-edition-project-hidden")
        divEditionProject.id = ("div-edition-project")

        logout.addEventListener("click", function() {
            window.localStorage.removeItem("token")
            this.onclick=document.location.href='index.html'
        })
    }

    let backgroundTrash = document.querySelectorAll(".background-trash")
    let arrayBackgroundTrash = Array.from(backgroundTrash)

    arrayBackgroundTrash.forEach(data => {
        data.addEventListener("click", function(event) {
            event.preventDefault()
            let id = data.dataset.id
            console.log(id)
            fetchDeleteElements(id)
        })
    })

    
    const inputFileVisualizer = document.querySelector(".input-file-visualizer-hidden")
    const inputFileVisualizerImg = document.querySelector(".input-file-visualizer-img-hidden")
    const inputFileButton = document.querySelector(".input-file-button")
    const inputFile = document.querySelector(".input-file")

    inputFileButton.addEventListener("change", function() {
        const fold = this.files[0]
        if(fold) {
            const visualizer = new FileReader();
            inputFile.classList.add("input-file-hidden")
            inputFileVisualizer.classList.add("input-file-visualizer")
            inputFileVisualizerImg.classList.remove("input-file-visualizer-img-hidden")
            inputFileVisualizerImg.classList.add("input-file-visualizer-img")
            visualizer.readAsDataURL(fold)
            visualizer.addEventListener('load', function() {
                inputFileVisualizerImg.src = this.result
            })
        }
    })

    showCategoriesInput()
    checkForm()
}

buildPage()