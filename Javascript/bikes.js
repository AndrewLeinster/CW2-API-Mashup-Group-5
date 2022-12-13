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
        var p = createNode("p");
        var text = createNode("p");
        var column = createNode("div");
        var h1 = createNode("h1");

        currentCity = network.find(record => record.location.city === searchedCity);
        cityName = currentCity.location.city;
        id = currentCity.id;

        h1.innerHTML = "Current bikes info"
        p.innerHTML = cityName;
        text.innerHTML = "City: " + p.innerHTML.bold();
        //column.classList.add("col-md-6")
        column.classList.add("mt-5");

        newurl = "https://api.citybik.es/v2/networks/" + id;
        fetch(newurl)
            .then((resp) => resp.json())
            .then(function (data2) {
                var p2 = createNode("p");
                var text2 = createNode("p");

                p2.innerHTML = data2.network.name;
                text2.innerHTML = "Company: " + p2.innerHTML.bold();

                var bikes = data2.network.stations;
                return bikes.map(function (bike) {
                    var p3 = createNode("p");
                    var p1 = createNode("p");
                    var p4 = createNode("p");
                    var text3 = createNode("p");
                    var text4 = createNode("p");
                    var p5 = createNode("p");
                    var a = createNode("a");

                    p1.classList.add("infomaychange");
                    a.classList.add("btn");
                    a.classList.add("btn-primary");
                    a.classList.add("buttonStyle");
                    a.classList.add("btn-primary:hover");
                    p1.innerHTML = "Please check for available bikes again at your chosen travelling time as this will change"
                    p3.innerHTML = bike.free_bikes;
                    text3.innerHTML = "Free Bikes: " + p3.innerHTML.bold();
                    p4.innerHTML = bike.name;
                    text4.innerHTML = "Location: " + p4.innerHTML.bold();
                    // get date time info
                    dInfo = bike.timestamp.split("T");
                    let date = dInfo[0];
                    let finalDate = date.split("-").reverse().toString().replaceAll(",", "/");
                    tInfo = dInfo[1].split(".")
                    let time = tInfo[0];
                    let finalTime = time.split(":");
                    finalTime.pop();
                    finalTime = finalTime.toString().replaceAll(",", ":")
                    a.innerHTML = "Back";
                    a.href = "../index.html";
                    p5.innerHTML = "Last updated: " + finalDate.bold() + " at " + finalTime.bold();

                    //append everything to container
                    append(column, h1);
                    append(column, p1)
                    append(column, text);
                    append(column, text2);
                    append(column, text3);
                    append(column, text4);
                    append(column, p5);
                    append(column, a);

                    append(bikesContainer, column);
                })
            })
            .catch(function (error) {
                console.log(error)
            });
    })

    .catch(function (error) {
        console.log(error)
    });

