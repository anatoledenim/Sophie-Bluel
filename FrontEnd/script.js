async function apiProjects() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    const worksName = works.map(works => works.title);
    const worksImage= works.map(works => works.imageUrl);

        for (i = 0; i < works.length; i++) {
            const divGallery = document.querySelector(".gallery");
            const figureHTML = document.createElement("figure");
            const imageGallery = document.createElement("img");
            imageGallery.src = worksImage[i];
            const nameGallery = document.createElement("p")
            nameGallery.innerText = worksName[i]
            divGallery.appendChild(figureHTML);
            figureHTML.appendChild(imageGallery);
            figureHTML.appendChild(nameGallery);
        }
}

apiProjects()



