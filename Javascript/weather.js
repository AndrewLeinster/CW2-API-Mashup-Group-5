
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

document.getElementById("submit").addEventListener("click", function () { getData() });
function getData() {
    const weatherContainer = document.getElementById("weather");
    let searchedCity = document.getElementById("location").value;
    url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + searchedCity + "/2022-12-03/?key=5KP9KEBYVW933PV52J78QTRGX";
    console.log(url)
    console.log(searchedCity)
    fetch(url)
        // convert to JSON
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            var weather = data.days;
            console.log(weather)
            var h1 = createNode("h1");
            h1.innerHTML = "City: " + data.address;
            return weather.map(function (wether) {
                var p = createNode("p");
                var p1 = createNode("p");
                var p2 = createNode("p");
                p.innerHTML = "Conditions: " + wether.conditions;
                p1.innerHTML = "Description: " + wether.description;
                p2.innerHTML = "Date Time: " + wether.datetime;

                append(weatherContainer, h1);
                append(weatherContainer, p);
                append(weatherContainer, p2);
                append(weatherContainer, p1);
            })

        })
        .catch(function (error) {
            console.log(error);
        });
}