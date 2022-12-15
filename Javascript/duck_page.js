// create helper functions
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// onload, call getData to get an image of a duck
addEventListener("load", (event) => {getData()});

// when clicked, call getData to get a new image of a duck
document.getElementById("dogButton").addEventListener("click", function () { getData() });

function getData() {
    const dogContainer = document.getElementById("dogs");
    const url = "https://dog.ceo/api/breeds/image/random";

    fetch(url)
        //convert to json
        .then((resp) => resp.json())
        .then(function (data) {

            dogContainer.innerHTML = "";
            var img = createNode("img");
            var p = createNode("p");
            img.classList.add("duckimg");

            img.src = data.message;
            p.innerHTML = "Definitely a duck";
            append(dogContainer, p)
            append(dogContainer, img);

        })

        .catch(function (error) {
            console.log(error);
        });
}


