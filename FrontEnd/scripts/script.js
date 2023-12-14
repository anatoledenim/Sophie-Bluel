// RECUPERER UNE ADRESSE AVEC FETCH
async function fetchGetElements(apiPoint) {
    const response = await fetch(apiPoint);
    return await response.json();
}

// AFFICHER LES BOUTONS DE FILTRE 
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

// APPLIQUER LE FILTRE TOUS SUR LA PAGE
function applyFilterTous() {
    const galleryItem = Array.from(document.getElementsByClassName("gallery-item"))
    galleryItem.forEach((element) => {
        let elementCategoryId = parseInt(element.dataset.categoryId)
        if (elementCategoryId >= 0) {
            element.classList.remove("display-none")
        }
    });
}

// APPLIQUER LES FILTRES SUR LA PAGE (OBJETS, APPARTEMENTS, H&R)
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
        let imageGallery = document.createElement("img");
        imageGallery.src = worksImage[i];
        modalGrid.appendChild(figureModal);
        figureModal.appendChild(imageGallery);

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
    let token = "gwEtS=KfKfR^zxJP83ULiw"
    if (window.localStorage.getItem("token") === token) {
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

    // let figureHTML = document.querySelector(".gallery-item")
    // let backgroundTrash = document.querySelector(".background-trash")
    // console.log(figureHTML.dataset.id)

    // backgroundTrash.addEventListener("click", function() {
    //     console.log(EventTarget.dataset.id)
    // })
}

buildPage()