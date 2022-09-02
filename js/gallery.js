// Get all gallery thumbs
let galleryImages = document.querySelectorAll(".gallery-img");
// Get latest opened image
let getLatestOpenedImg;
// Get window width
let windowWidth = window.innerWidth;

// Check if we have any thumbs
if(galleryImages) {
    // Create onclick function for each image
    galleryImages.forEach(function(image, index) {
        image.onclick = function() {
            // Get the image URL from our element CSS
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue('background-image');
            let getImgUrlPos = getFullImgUrl.split("/img/thumbs/");
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');

            // Save the image nr to use later with prev/next buttons
            getLatestOpenedImg = index + 1;
        
            // Create a popup window
            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            //newImgWindow.setAttribute("onclick", "closeImg()");
            
            // Insert image inside window
            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "img/" + setNewImgUrl);
            newImg.setAttribute("id", "current-image");

            // Prev/Next buttons
            newImg.onload = function(){
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;
				if (calcImgToEdge < 0) {
					calcImgToEdge = 0;
				}

                let newNextBtn = document.createElement("button");
                let btnNextText = document.createTextNode("Next");
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

                let newPrevBtn = document.createElement("button");
                let btnPrevText = document.createTextNode("Prev");
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(-1)");
                newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";

				var button = document.createElement('button');
				button.innerHTML = 'EXIT';
				button.id = 'exit';
                button.setAttribute("class", "img-btn-next");
				button.style.top = '10px';
				button.style.left = '49%';
				button.onclick = function() {
					closeImg();
				};
				container.appendChild(button);
            }
        }
    });
	document.addEventListener("keydown", function(event) {
		event.preventDefault();
        if (event.keyCode == 27) {
			closeImg();
		}
		const key = event.key;
		switch (key) {
			case "ArrowLeft":
			// Left pressed
			changeImg(-1)
			break;
			case "ArrowRight":
			// Right pressed
			changeImg(1)
			break;
		}
	});
}

function closeImg() {
    // Remove the image window
    document.querySelector(".img-window").remove();

    // Remove the prev/next/exit buttons
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
	document.getElementById('exit').remove();
}

function changeImg(changeDir) {
    // Remove current image
    document.querySelector("#current-image").remove();

    // Generate new image
    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    // Set new image "src"
    let calcNewImg;
    if(changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if(changeDir === -1) {
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }
	var url = "img/img" + calcNewImg + ".jpeg"
	newImg.setAttribute("src", url);
    newImg.setAttribute("id", "current-image");

    // Adjust our global variable "getLatestOpenedImg"
    getLatestOpenedImg = calcNewImg;

    // Change the button positions
    newImg.onload = function(){
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2);

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: " + (calcImgToEdge - 100) + "px;";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left: " + (calcImgToEdge - 80) + "px;";
    }
}

function closeText() {
    // Remove the text window
    document.querySelector(".text-window").remove();
}

