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
    const divGallery = document.querySelector(".gallery");

    for (i = 0; i < works.length; i++) {
        const figureHTML = document.createElement("figure");
        figureHTML.dataset.categoryId = categoryId[i];
        figureHTML.classList.add("gallery-item")
        const imageGallery = document.createElement("img");
        imageGallery.src = worksImage[i];
        const nameGallery = document.createElement("p");
        nameGallery.innerText = worksName[i];
        divGallery.appendChild(figureHTML);
        figureHTML.appendChild(imageGallery);
        figureHTML.appendChild(nameGallery);
    }

    // for (i = 0; i < works.length; i++) {
    //     const figureModal = document.createElement("figure");
    //     figureModal.dataset.categoryId = categoryId[i];
    //     figureModal.classList.add("gallery-item")
    //     const imageGallery = document.createElement("img");
    //     imageGallery.src = worksImage[i];
    //     const nameGallery = document.createElement("p");
    //     nameGallery.innerText = worksName[i];
    //     divGallery.appendChild(figureHTML);
    //     figureHTML.appendChild(imageGallery);
    //     figureHTML.appendChild(nameGallery);
    // }


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
}

buildPage()