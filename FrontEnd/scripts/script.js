// GET ADRESS WITH FETCH
async function fetchGetElements(apiPoint) {
  const response = await fetch(apiPoint);
  return await response.json();
}

// SHOW FILTER BUTTON
async function buildFilter(filterBar) {
  const categories = await fetchGetElements(
    "http://localhost:5678/api/categories"
  );
  const filterBarTousP = document.createElement("button");
  filterBarTousP.classList.add("filter-bar-button");
  filterBarTousP.classList.add("filter-button-green");
  filterBarTousP.dataset.categoryId = 0;
  filterBarTousP.innerText = "Tous";
  filterBar.appendChild(filterBarTousP);

  Array.from(categories).forEach((category) => {
    let filterBarButton = document.createElement("button");
    filterBarButton.innerText = category.name;
    filterBarButton.dataset.categoryId = category.id;
    filterBarButton.setAttribute("id", "filter-button");
    filterBarButton.classList.add("filter-bar-button");
    filterBar.appendChild(filterBarButton);

    filterBarTousP.addEventListener("click", function () {
      applyFilterTous(category.id);
    });
    filterBarButton.addEventListener("click", function () {
      applyFilter(category.id);
    });
  });
}

// APPLY FILTER TOUS ON PAGE
function applyFilterTous() {
  const galleryItem = Array.from(
    document.getElementsByClassName("gallery-item")
  );
  galleryItem.forEach((element) => {
    let elementCategoryId = parseInt(element.dataset.categoryId);
    if (elementCategoryId >= 0) {
      element.classList.remove("display-none");
    }
  });
  applyActiveButtonFilter(0);
}

// APPLY FILTER ON PAGE (OBJETS, APPARTEMENTS, HOTELS ET RESTAURANTS)
function applyFilter(filterCategoryId) {
  const galleryItem = Array.from(
    document.getElementsByClassName("gallery-item")
  );
  galleryItem.forEach((element) => {
    let elementCategoryId = parseInt(element.dataset.categoryId);
    if (elementCategoryId !== filterCategoryId) {
      element.classList.add("display-none");
    } else {
      element.classList.remove("display-none");
    }
  });
  applyActiveButtonFilter(filterCategoryId);
}

function applyActiveButtonFilter(filterCategoryId) {
  const filterBarChildren = document.querySelector(".filter-bar").children;
  Array.from(filterBarChildren).forEach((filterButton) => {
    let filterButtonCategoryId = parseInt(filterButton.dataset.categoryId);
    if (filterCategoryId === filterButtonCategoryId) {
      filterButton.classList.add("filter-button-green");
    } else {
      filterButton.classList.remove("filter-button-green");
    }
  });
}

// FUNCTION TO DELETE ELEMENTS
const fetchDeleteElements = async function (id) {
  let token = localStorage.getItem("authentificationToken");
    await fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: "Bearer " + token,
    },
  });
}

// FUNCTION TO SHOW CATEGORIES CHOICES IN THE INPUT
async function showCategoriesInput() {
  const categories = await fetchGetElements(
    "http://localhost:5678/api/categories"
  );
  const categoriesNames = categories.map((categories) => categories.name);
  const categoriesId = categories.map((categories) => categories.id);
  let inputCategory = document.querySelector(".input-category-choice");

  let arrayCategories = Array.from(categories);
  for (i = 0; i < arrayCategories.length; i++) {
    let option = document.createElement("option");
    option.classList.add("option-select");
    option.innerText = categoriesNames[i];
    option.setAttribute("value", categoriesId[i]);
    inputCategory.appendChild(option);
  }
}


// FUNCTION TO CHECK IF EACH INPUTS IS FILLED
const validateButton = document.getElementById("validate-button");
function checkForm() {
  let inputFile = document.querySelector(".input-file-button").files.length;
  let inputText = document.querySelector(".input-title-text").value.length;
  let inputCategory = document.querySelector(".input-category-choice").value;

  if (inputFile > 0 && inputText > 0 && inputCategory !== "") {
    validateButton.classList.remove("disabled-button");
    validateButton.classList.add("unabled-button");
    return true;
  } else {
    validateButton.classList.remove("unabled-button");
    validateButton.classList.add("disabled-button");
    return false;
  }
}

const form = document.querySelector("form");
let inputs = form.querySelectorAll("input, select").forEach((input) => {
  input.addEventListener("input", () => {
    console.log(checkForm());
  });
});

let inputImage = document.getElementById("input-image")
let inputTitle = document.querySelector(".input-title-text")
let inputChoice= document.querySelector(".input-category-choice")
let inputImageVisualizer = document.querySelector(".input-file-visualizer-img-hidden")
let inputVisualizer = document.querySelector(".input-file-visualizer-hidden")
let inputFile = document.querySelector(".input-file")


// VALIDATION BY CLICK TO POST THE NEW WORK/ERROR MESSAGE IF EACH INPUT IS NOT FILLED
validateButton.addEventListener("click", function(e) {
  e.preventDefault()
  let checkInputs = checkForm();
  if (checkInputs === false) {
    alert("Veuillez remplir tous les champs.")
  } 
  else {
    fetchPostElement("http://localhost:5678/api/works");
    inputImageVisualizer.src = ""
    inputImageVisualizer.classList.remove("input-file-visualizer-img")
    inputImageVisualizer.classList.add("input-file-visualizer-img-hidden")
    inputVisualizer.classList.remove("input-file-visualizer")
    inputVisualizer.classList.add("input-file-visualizer-hidden")
    inputFile.classList.add("input-file")
    inputFile.classList.remove("input-file-hidden")
    inputTitle.value = ""
    inputChoice.value = 0
  }
})

// FUNCTION TO POST ELEMENT ON THE DATABASE
async function fetchPostElement(apiPoint) {
  let token = localStorage.getItem("authentificationToken");
  let inputImage = document.querySelector("#input-image");
  let title = document.querySelector(".input-title-text");
  let category = document.querySelector(".input-category-choice");

  let formData = new FormData();
  formData.append("image", inputImage.files[0]);
  formData.append("title", title.value);
  formData.append("category", parseInt(category.value));
  let response = await fetch(apiPoint, {
    method: "POST",
    headers: { accept: "application/json", Authorization: "Bearer " + token },
    body: formData,
  })
  if (response.ok) {
    let json = await response.json()

    let divGallery = document.querySelector(".gallery")
    let modalGrid = document.querySelector(".modal-grid")
    let newFigureHTMLGallery = document.createElement("figure")
    newFigureHTMLGallery.dataset.categoryId = json.categoryId
    newFigureHTMLGallery.dataset.id = json.id;
    newFigureHTMLGallery.classList.add("gallery-item")
    let newFigureHTMLModal = document.createElement("figure")
    newFigureHTMLModal.dataset.categoryId = json.categoryId
    newFigureHTMLModal.dataset.id = json.id;
    newFigureHTMLModal.id = "figure-modal"
    let newWorkImageModal = document.createElement("img")
    newWorkImageModal.src = json.imageUrl
    newWorkImageModal.classList.add("modal-grid-image")
    let newWorkImage = document.createElement("img")
    newWorkImage.src = json.imageUrl
    let newWorkName = document.createElement("p")
    newWorkName.innerText = json.title

    divGallery.appendChild(newFigureHTMLGallery)
    newFigureHTMLGallery.appendChild(newWorkImage)
    newFigureHTMLGallery.appendChild(newWorkName)

    modalGrid.appendChild(newFigureHTMLModal)
    newFigureHTMLModal.appendChild(newWorkImageModal)

    let backgroundTrash = document.createElement("div");
    backgroundTrash.dataset.categoryId = json.categoryId;
    backgroundTrash.dataset.id = json.id;
    backgroundTrash.classList.add("background-trash");
    let linkTrash = document.createElement("a");
    linkTrash.classList.add("link-trash");
    let trash = document.createElement("img");
    trash.classList.add("trash");
    trash.src = "../FrontEnd/assets/images/Vector (3).png";
    newFigureHTMLModal.appendChild(backgroundTrash);
    backgroundTrash.appendChild(linkTrash);
    linkTrash.appendChild(trash);
  }
}

// SHOW ELEMENTS ON THE PRINCIPAL PAGE
async function buildPage() {
  const works = await fetchGetElements("http://localhost:5678/api/works");

  const filterBar = document.querySelector(".filter-bar");
  buildFilter(filterBar);

  const worksName = works.map((works) => works.title);
  const worksImage = works.map((works) => works.imageUrl);
  const categoryId = works.map((works) => works.categoryId);
  const id = works.map((works) => works.id);
  const divGallery = document.querySelector(".gallery");
  const modalGrid = document.querySelector(".modal-grid");

  for (i = 0; i < works.length; i++) {
    let figureHTML = document.createElement("figure");
    figureHTML.dataset.categoryId = categoryId[i];
    figureHTML.dataset.id = id[i];
    figureHTML.classList.add("gallery-item");
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
    figureModal.id = "figure-modal";
    let imageGalleryModal = document.createElement("img");
    imageGalleryModal.src = worksImage[i];
    imageGalleryModal.classList.add("modal-grid-image");
    modalGrid.appendChild(figureModal);
    figureModal.appendChild(imageGalleryModal);

    let backgroundTrash = document.createElement("div");
    backgroundTrash.dataset.categoryId = categoryId[i];
    backgroundTrash.dataset.id = id[i];
    backgroundTrash.classList.add("background-trash");
    let linkTrash = document.createElement("a");
    linkTrash.classList.add("link-trash");
    let trash = document.createElement("img");
    trash.classList.add("trash");
    trash.src = "../FrontEnd/assets/images/Vector (3).png";
    figureModal.appendChild(backgroundTrash);
    backgroundTrash.appendChild(linkTrash);
    linkTrash.appendChild(trash);
  }

  let h2Project = document.getElementById("h2-project");
  const token = localStorage.getItem("authentificationToken");
  if (
    localStorage.getItem("authentificationToken") === token && localStorage.getItem("authentificationToken") !== null
  ) {
    let divBlack = document.getElementById("div-black-hidden");
    divBlack.id = "div-black";
    divBlack.id;
    let login = document.getElementById("login");
    let logout = document.getElementById("display-none");
    login.id = "display-none";
    logout.id = "logout";
    filterBar.classList.add("display-none");
    h2Project.classList.add("padding-bottom");
    let divEditionProject = document.getElementById(
      "div-edition-project-hidden"
    );
    divEditionProject.id = "div-edition-project";

    logout.addEventListener("click", function () {
      localStorage.removeItem("authentificationToken");
      this.onclick = document.location.href = "index.html";
    });
  }

  let backgroundTrash = document.querySelectorAll(".background-trash");
  Array.from(backgroundTrash).forEach((data) => {
    data.addEventListener("click", function (event) {
      event.preventDefault();
      let id = data.dataset.id;
      fetchDeleteElements(id);
      let trashIcon = event.target
      let trashDiv = trashIcon.parentNode
      let deleteElement = trashDiv.parentNode
      deleteElement.parentNode.remove()

      let divGallery = document.querySelector(".gallery").children
      let arrayGallery = Array.from(divGallery)
      arrayGallery.forEach((figure) => {
        if (figure.dataset.id === id) {
          figure.remove()
        }
      })
    });
  });

  const inputFileVisualizer = document.querySelector(
    ".input-file-visualizer-hidden"
  );
  const inputFileVisualizerImg = document.querySelector(
    ".input-file-visualizer-img-hidden"
  );
  const inputFileButton = document.querySelector(".input-file-button");
  const inputFile = document.querySelector(".input-file");

  inputFileButton.addEventListener("change", function () {
    const fold = this.files[0];
    if (fold) {
      const visualizer = new FileReader();
      inputFile.classList.add("input-file-hidden");
      inputFileVisualizer.classList.add("input-file-visualizer");
      inputFileVisualizerImg.classList.remove(
        "input-file-visualizer-img-hidden"
      );
      inputFileVisualizerImg.classList.add("input-file-visualizer-img");
      visualizer.readAsDataURL(fold);
      visualizer.addEventListener("load", function () {
        inputFileVisualizerImg.src = this.result;
      });
    }
  });

  showCategoriesInput();
  console.log(token)
}

buildPage();
