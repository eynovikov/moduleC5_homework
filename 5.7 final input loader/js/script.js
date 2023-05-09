const requestUrlBase = "https://picsum.photos/v2/list";

function displayImagesFromStorage() {
    const imagesHTML = localStorage.imageData;
    const imagesSection = document.querySelector(".images");
    imagesSection.innerHTML = imagesHTML;
}

if (localStorage.imageData) {
    displayImagesFromStorage();
}

const btn = document.querySelector(".image-loader-btn");

btn.addEventListener("click", () => {
    // clearing the invalid number msg if it presents
    const invalidNumberMsg = document.querySelector(".invalid-number-msg");
    if (invalidNumberMsg) {
        invalidNumberMsg.remove();
    }

    let page = document.querySelector(".page-input").value;
    let limit = document.querySelector(".limit-input").value;
    page = Math.floor(page);
    limit = Math.floor(limit);
    let invalidPage = isNaN(page) || page < 1 || page > 10;
    let invalidLimit = isNaN(limit) || limit < 1 || limit > 10;
    if (invalidPage && invalidLimit) {
        insertInvalidNumberMessage("Номер страницы и лимит вне диапазона от 1 до 10");
        return;
    } else if (invalidPage) {
        insertInvalidNumberMessage("Номер страницы вне диапазона от 1 до 10");
        return;
    } else if (invalidLimit) {
        insertInvalidNumberMessage("Лимит вне диапазона от 1 до 10");
        return;
    }

    requestImages(requestUrlBase, page, limit);
})


function requestImages(urlBase, page, limit) {
    const requestUrl = urlBase + `?page=${page}&limit=${limit}`;
	fetch(requestUrl)
	  .then(response => {
	  	return response.json();
	  })
	  .then(data => {
        displayImages(data);
      })
      .catch(error => {
        console.log(error);
      })
}


function displayImages(images) {
    const imagesSection = document.querySelector(".images");
    let imagesCollection = "";
    images.forEach(imageObj => {
        let imageUrl = imageObj.download_url;
        let imageTag = `<img src="${imageUrl}" width=300 height=200>`
        imagesCollection += imageTag;
    })
    imagesSection.innerHTML = imagesCollection;
    localStorage.imageData = imagesCollection;
}


function insertInvalidNumberMessage(message) {
	const msg = document.createElement("div");
	msg.setAttribute("class", "invalid-number-msg");
	msg.innerHTML = `<p>${message}</p>`;
	const button = document.querySelector(".image-loader-btn");
	const buttonParent = button.parentElement;
	buttonParent.insertBefore(msg, button.nextSibling);
}