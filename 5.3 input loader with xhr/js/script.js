const requestUrlBase = "https://picsum.photos/v2/list";

function requestImages(number, urlBase, callback) {
	const xhr = new XMLHttpRequest();
	const requestUrl = urlBase + `?limit=${number}`;

	xhr.open("GET", requestUrl);

	xhr.onload = function() {
		if (xhr.status != 200) {
      		console.log('Response status: ', xhr.status);
      	} else {
      		const images = JSON.parse(xhr.response);
			callback(images);
      	}
	}

	xhr.onerror = function() {
	    console.log('Error! Response status: ', xhr.status);
    }

	xhr.send();

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
}

const btn = document.querySelector(".image-loader-btn");

btn.addEventListener("click", url => {
	const invalidNumberMsg = document.querySelector(".invalid-number-msg");
	if (invalidNumberMsg) {
		invalidNumberMsg.remove();
	}

	let number = document.querySelector(".number-input").value;
	number = Math.floor(number);
	if (!number || number < 1 || number > 10) {
		insertInvalidNumberMessage("A number should be between 1 and 10 &#x1F614");
		return;
	}

	requestImages(number, requestUrlBase, displayImages);
})


function insertInvalidNumberMessage(message) {
	const msg = document.createElement("div");
	msg.setAttribute("class", "invalid-number-msg");
	msg.innerHTML = `<p>${message}</p>`;
	const inputForm = document.querySelector(".image-loader");
	document.body.insertBefore(msg, inputForm.nextSibling);
}