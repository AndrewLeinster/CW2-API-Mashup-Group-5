/*Create helper functions*/
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

/*Get current url to get location info*/
currentLocation = window.location.href;
var searchString = currentLocation.split("?");
var city = searchString[1];

//https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
//capitalise first letter of city so it works in bike api
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//https://stackoverflow.com/questions/10679580/javascript-search-inside-a-json-object

var bikeUrl = "https://api.citybik.es/v2/networks";
const bikesContainer = document.getElementById("bikes");
let searchedCity = capitaliseFirstLetter(city);
fetch(bikeUrl)
    .then((resp) => resp.json())
    .then(function (data) {
        var network = data.networks

        currentCity = network.find(record => record.location.city === searchedCity);
        cityName = currentCity.location.city;
        id = currentCity.id;

        newurl = "https://api.citybik.es/v2/networks/" + id;
        fetch(newurl)
            .then((resp) => resp.json())
            .then(function (data2) {
                var bikes = data2.network.stations;
                return bikes.map(function (bike) {
                    var p3 = createNode("p");
                    var text3 = createNode("p");
                    var text4 = createNode("p");
                    var p5 = createNode("p");
                    var p = createNode("p");
                    var text = createNode("p");
                    var h2 = createNode("h2");
                    var a = createNode("a");
                    var text2 = createNode("h2");
                    var card = createNode("div");
                    var cardBody = createNode("div");
                    var column = createNode("div");

                    cardBody.classList.add("card-body");
                    cardBody.classList.add("p-3")
                    cardBody.classList.add("px-5")
                    cardBody.classList.add("py-4")
                    card.classList.add("card");
                    card.classList.add("mt-3");
                    text.classList.add("card-text");
                    text3.classList.add("card-text");
                    text4.classList.add("card-text");
                    column.classList.add("col-md-3");
                    column.classList.add("d-flex");
                    column.classList.add("align-items-stretch")
                    p5.innerHTML = data2.network.name;
                    text4.innerHTML = "Company: " + p5.innerHTML.bold();
                    p3.innerHTML = bike.free_bikes;
                    text3.innerHTML = "Free Bikes: " + p3.innerHTML.bold();
                    h2.innerHTML = bike.name;
                    text2.innerHTML = h2.innerHTML.bold();
                    text2.classList.add("card-title");
                    p.innerHTML = cityName;
                    text.innerHTML = "City: " + p.innerHTML.bold();
                    a.classList.add("btn");
                    a.classList.add("btn-primary");
                    a.classList.add("buttonStyle");
                    a.classList.add("btn-primary:hover");
                    a.innerHTML = "Back";
                    a.href = "../index.html";

                    // get date time info
                    dInfo = bike.timestamp.split("T");
                    let date = dInfo[0];
                    let finalDate = date.split("-").reverse().toString().replaceAll(",", "/");
                    tInfo = dInfo[1].split(".")
                    let time = tInfo[0];
                    let finalTime = time.split(":");
                    finalTime.pop();
                    finalTime = finalTime.toString().replaceAll(",", ":")
                    p5.innerHTML = "Last updated: " + finalDate.bold() + " at " + finalTime.bold();

                    card.classList.add("cardStyle");
                    append(cardBody, text2);
                    append(cardBody, text);
                    append(cardBody, text3);
                    append(cardBody, text4);
                    append(cardBody, p5);
                    append(cardBody, a);
                    append(card, cardBody);
                    append(column, card);
                    append(bikesContainer, column);
                    console.log(bikesContainer)
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    })

    .catch(function (error) {
        console.log(error)
    });

