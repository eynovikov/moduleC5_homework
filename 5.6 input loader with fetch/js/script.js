const requestUrlBase = "https://picsum.photos/";

const btn = document.querySelector(".image-loader-btn");

btn.addEventListener("click", () => {
    // clearing the invalid number msg if it presents
    const invalidNumberMsg = document.querySelector(".invalid-number-msg");
    if (invalidNumberMsg) {
        invalidNumberMsg.remove();
    }

    let width = document.querySelector(".width-input").value;
    let height = document.querySelector(".height-input").value;
    width = Math.floor(width);
    height = Math.floor(height);
    if (!width || width < 100 || width > 300 || !height || height < 100 || height > 300) {
        insertInvalidNumberMessage("Please enter two numbers from 100 to 300");
        return;
    }

    requestImage(width, height, requestUrlBase);
})


function requestImage(width, height, urlBase) {
	const requestUrl = urlBase + `${width}/${height}`;
	fetch(requestUrl)
	  .then(response => {
	  	return response.blob();
	  })
	  .then(data => {
	  	const imageUrl = URL.createObjectURL(data);
	  	displayImages(imageUrl, width, height);
      })
      .catch(error => {
        console.log(error);
      })
}


function displayImages(imageUrl, width, height) {
	const imageHTML = `<img src="${imageUrl}" width=${width} height=${height} alt="Random image">`;
	const imagesSection = document.querySelector(".image");
	imagesSection.innerHTML = imageHTML;
}


function insertInvalidNumberMessage(message) {
	const msg = document.createElement("div");
	msg.setAttribute("class", "invalid-number-msg");
	msg.innerHTML = `<p>${message}</p>`;
	const button = document.querySelector(".image-loader-btn");
	const buttonParent = button.parentElement;
	buttonParent.insertBefore(msg, button.nextSibling);
}