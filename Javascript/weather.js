window.onload = updateFavouriteList();

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
    let date = document.getElementById("dateTime").value;
    console.log(date)
    console.log(searchedCity)
    url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + searchedCity + "/" + date + ":00/?key=5KP9KEBYVW933PV52J78QTRGX&include=current";
    console.log(url)
    console.log(searchedCity)
    fetch(url)
        // convert to JSON
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            var weather = data.days;
            console.log(weather)
            return weather.map(function (wether) {
                var h2 = createNode("h2");
                var p = createNode("p");
                var p1 = createNode("p");
                var p2 = createNode("p");
                var p3 = createNode("p");
                var a = createNode("a");
                var div = createNode("div");
                var i = createNode("i");
                var column = createNode("div");
                var cardBody = createNode("div");

                cardBody.classList.add("card-body");
                cardBody.classList.add("p-3")
                cardBody.classList.add("px-5")
                cardBody.classList.add("py-4")
                column.classList.add("col-md-4");
                h2.classList.add("card-title");
                p.classList.add("card-text");
                p1.classList.add("card-text");
                p2.classList.add("card-text");
                p3.classList.add("card-text");
                h2.innerHTML = data.address;
                p.innerHTML = "Conditions: " + wether.conditions;
                p1.innerHTML = "Description: " + wether.description;
                p2.innerHTML = "Date: " + wether.datetime;
                p3.innerHTML = "Time: " + data.currentConditions.datetime;
                a.classList.add("btn");
                a.classList.add("btn-primary");
                a.innerHTML = "More Info";
                div.classList.add("heart_container");
                cardBody.setAttribute("id", "newFavourite");
                i.setAttribute("onclick", "saveItem()")
                i.classList.add("fa-regular");
                i.classList.add("fa-heart");
                i.setAttribute("id", "heart");
                a.classList.add("buttonStyle");
                a.innerHTML = "More Info"

                //save city name to local storage
                /* This doesn't work
                cityName = (data) => {
                    data.forEach(data => {
                        city = data.address;
                        console.log(city)
                        localStorage.setItem("name", JSON.stringify(city))
                    })
                }*/

                //This code does make something happen, but sets all cities to the same each time
                cityName = localStorage.setItem("name", JSON.stringify(data.address))
                
                //will make this link to a more info page later
                a.href = "./Pages/moreinfo.html?" + data.address + "?" + wether.datetime + "?" + data.currentConditions.datetime;
                console.log(a.href)
                weatherContainer.classList.add("cardStyle");
                append(cardBody, h2);
                append(cardBody, p);
                append(cardBody, p1);
                append(cardBody, p2);
                append(cardBody, p3);
                append(cardBody, a);
                append(div, i);
                append(cardBody, div);
                append(column, cardBody);
                append(weatherContainer, column);
                console.log(weatherContainer)
            })


        })
        .catch(function (error) {
            console.log(error);
        });
}



//adding item to list
function saveItem() {
    var storedList = localStorage.getItem("favouriteItems")
    storedList = JSON.parse(storedList)
    console.log(storedList);
    storedList.push(document.getElementById("newFavourite").value);
    localStorage.setItem("favouriteItems", JSON.stringify(storedList));
    updateFavouriteList();
    document.getElementById("newFavourite").value = "";
}

function updateFavouriteList() {
    if (localStorage.getItem("favouriteItems") === null) { //  if array doesnt exist make one
        blankArray = [];
        localStorage.setItem("favouriteItems", JSON.stringify(blankArray));
        printNoFavourites();
    } else if (localStorage.getItem("favouriteItems") === "[]") { //  if array does exist but is empty
        printNoFavourites();
    } else {
        storedList = JSON.parse(localStorage.getItem("favouriteItems")); //get localstorage and turn into array
        favouritesContainer = document.createElement('div'); //go through array and write a new alert box for each
        storedList.forEach(function (item, index) {
            div2 = createNode('div');
            div2.setAttribute('class', 'mb-2 col-md-12');
            div2.innerHTML = "<div><p>" + JSON.parse(localStorage.getItem("name")) + "</p></div>";
            favouritesContainer.appendChild(div2);
        });
        document.getElementById('containerbox').innerHTML = favouritesContainer.innerHTML;
    }
}

function printNoFavourites() {
    nofavourites = "<div class='mb-2 col-md-12'><p class='mb-2 mt-2 text-center p-2'><i class='fa-solid fa-star'></i></i> No Saved Favourites</p></div>";
    document.getElementById('containerbox').innerHTML = nofavourites;
}
