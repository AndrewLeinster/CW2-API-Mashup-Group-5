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
                    var button = createNode("button");
                    var input = createNode("input");
                    var div = createNode("div");
                    var i = createNode("i");
                    var column = createNode("div");
                    var card = createNode("div");
                    var cardBody = createNode("div");

                    cardBody.classList.add("card-body");
                    cardBody.classList.add("p-3")
                    card.classList.add("card");
                    card.classList.add("mt-3");
                    column.classList.add("cardStyle");
                    card.classList.add("cardStyle");
                    column.classList.add("col-md-4");
                    h2.classList.add("card-title");
                    h2.classList.add("cardStyle");
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
                    i.classList.add("fa-regular");
                    i.classList.add("fa-heart");
                    i.setAttribute("id","heart");
                    p.classList.add("cardStyle");
                    p1.classList.add("cardStyle");
                    p2.classList.add("cardStyle");
                    p3.classList.add("cardStyle");
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
        
                })


            })
        .catch(function (error) {
            console.log(error);
        });
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
        toDoContainer = document.createElement('div'); //go through array and write a new alert box for each
        storedList.forEach(function (item, index) {
            div = document.createElement('div');
            div.setAttribute('class', 'mb-2 col-md-12');
            div.innerHTML = "<div class='alert alert-primary mb-1' onClick='complete(" + index + ")' id=item-" + index + ")'><p class='mb-0'><i class='far fa-circle mr-4'></i>" + " " + item + "</p></div>";
            toDoContainer.appendChild(div);
        });
        document.getElementById('containerbox').innerHTML = favourites.innerHTML;
    }
}

function printNoFavourites() {
    nofavourites = "<div class='mb-2 col-md-12'><p class='mb-2 mt-2 text-center p-2'><i class='fa-solid fa-star'></i></i> No Saved Favourites</p></div>";
    document.getElementById('containerbox').innerHTML = nofavourites;
}
