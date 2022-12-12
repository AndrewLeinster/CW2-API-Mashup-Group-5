/*Create helper functions*/
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

//https://stackoverflow.com/questions/10679580/javascript-search-inside-a-json-object
document.getElementById("submit").addEventListener("click", function () { getBikeData() });
function getBikeData() {
    var url = "https://api.citybik.es/v2/networks";
    const bikesContainer = document.getElementById("bikes");
    let searchedCity = document.getElementById("location").value;
    console.log(searchedCity)
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            var network = data.networks
            var p = createNode("p");
            currentCity = network.find(record => record.location.city === searchedCity)
            //console.log(currentCity)
            cityName = currentCity.location.city;
            console.log(cityName);
            p.innerHTML = cityName;
            append(bikesContainer, p);
        })

        .catch(function (error) {
            console.log(error)
        });
}
