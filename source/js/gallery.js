document.addEventListener("DOMContentLoaded", function() {
    photos();
});

function fetchPhotos() {
    return new Promise(async (resolve, reject) => {
        try {
            setTimeout(async () => {
                const response = await fetch('https://jsonplaceholder.typicode.com/photos')
                    .catch(function (error) {
                        reject(error);
                    })
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                resolve(data);
            }, 1000);
        } catch (error) {
            reject(error);
        }
    });
}

function photos() {
    fetchPhotos()
        .then((photosData) => {
            showGallery(photosData);
        })
        .catch((error) => {
            document.getElementsByClassName("preloader")[0].style.display = "none";
            const galleryContainer = document.getElementById('galleryShow');
            galleryContainer.innerHTML = '<p class="error">⚠ Что-то пошло не так ⚠</p>';
            console.error(error.message);
        });
}

function showGallery(photosData) {
    const filteredData = filterPhotos(photosData);
    renderGallery(filteredData);
}

function filterPhotos(photosData) {
    const randomFilter = Math.random() < 0.5;
    let filteredData;
    if (randomFilter) {
        filteredData = photosData.filter(photo => photo.id >= 100);
    } else {
        filteredData = photosData.filter(photo => photo.id <= 200);
    }
    return filteredData.slice(0, 200);
}

function renderGallery(data) {
    const galleryContainer = document.getElementById('galleryShow');

    data.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.thumbnailUrl;
        imgElement.alt = photo.title;
        const linkElement = document.createElement('a');
        linkElement.href = photo.url;
        linkElement.appendChild(imgElement);
        const figureElement = document.createElement('figure');
        figureElement.appendChild(linkElement);
        const figcaptionElement = document.createElement('figcaption');
        figcaptionElement.innerText = photo.title;
        figureElement.appendChild(figcaptionElement);
        galleryContainer.appendChild(figureElement);
    });
    document.getElementsByClassName("preloader")[0].style.display = "none";
}