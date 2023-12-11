// RECUPERER UNE ADRESSE AVEC FETCH
async function fetchGetElements(apiPoint) {
    const response = await fetch(apiPoint);
    return await response.json();
}

// AFFICHER LES BOUTONS DE FILTRE 
async function buildFilter(filterBar) {
    const categories = await fetchGetElements("http://localhost:5678/api/categories");
    const filterBarTousP = document.createElement("button");
    filterBarTousP.classList.add("filter-button")
    filterBarTousP.innerText = "Tous";
    filterBar.appendChild(filterBarTousP)
    
    Array.from(categories).forEach((category) => {
    let filterBarButton = document.createElement("button");
    filterBarButton.innerText = category.name;
    filterBarButton.dataset.categoryId = category.id
    filterBarButton.classList.add("filter-button")
    filterBar.appendChild(filterBarButton)
    })
}

// APPLIQUER LES FILTRES SUR LA PAGE
function applyFilter(filterCategoryId) {
    galleryItem.forEach((element) => {
        let elementCategoryId = parseInt(element.dataset.categoryId)
        if (elementCategoryId !== filterCategoryId) {
            element.classList.add("display-none")
        } else {
            element.classList.remove("display-none")
        }
    });
}

// AFFICHER LES PROJETS SUR LE BLOC PRINCIPAL
async function buildPage() {
    const works = await fetchGetElements("http://localhost:5678/api/works");

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

    const filterBar = document.querySelector(".filter-bar");
    buildFilter(filterBar)  
    
    let filterBarButton = document.getElementsByClassName("filter-button")
    console.log(filterBarButton)

    const galleryItem = Array.from(document.getElementsByClassName("gallery-item"))
    for (i = 1; i < filterBarButton.length; i++) {
        filterBarButton = document.getElementsByClassName("filter-button")
        filterBarButton[i].addEventListener("click", function() {
        applyFilter(i)
    });
    console.log(galleryItem)
    }

}

buildPage()


