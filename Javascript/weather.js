// First half of document is on the favourites list, second half is on the theme.
/*
onload, check if an array of favourites exisits, 
- if not create one, display 'no favourites' message
- if there is, and it is empty, display 'no favourites' message
- if there is, and it is populated, display the list of favourites
*/
window.onload = updateFavouriteList();


// helper functions
function createNode(element) {
	return document.createElement(element);
}

function append(parent, el) {
	return parent.appendChild(el);
}

// on condition, call associated method
document.getElementById("clear").addEventListener("click", function () { clearfavourites() });
document.getElementById("submit").addEventListener("click", function () { additem() });
document.getElementById("submit").addEventListener("onkeydown", function () { additem() });


// when called, removes all children of weather container and adds the new data
// This prevents being able to stack instances of multiple cities
function additem() {

	var div = document.getElementById('weather');
	while (div.firstChild) {
		div.removeChild(div.firstChild);
		console.log('removed +' + div.firstChild)
	}
	console.log("submitting")
	getData();
}


/* when called, this savese theme preference to a variable, 
clears loal storage and then reassigns theme preferences 
in local storage back to the value in the variable. */
function clearfavourites() {
	localStorage.clear();
	window.localStorage.setItem('theme', theme);
	updateFavouriteList();
}


/* This is the function that deals with getting values from weather API
and displaying them in the weather container on the page. */
function getData() {
	const weatherContainer = document.getElementById("weather");
	let searchedCity = document.getElementById("location").value;
	let date = document.getElementById("dateTime").value;
	// getting the correct url for the chosen location and date
	url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + searchedCity + "/" + date + ":00/?key=5KP9KEBYVW933PV52J78QTRGX&include=current";
	fetch(url)
		// convert to JSON
		.then((resp) => resp.json())
		.then(function (data) {
			var weather = data.days;

			// displaying results
			return weather.map(function (wether) {
				var h2 = createNode("h2");
				var p = createNode("p");
				var p1 = createNode("p");
				var p2 = createNode("p");
				var p3 = createNode("p");
				var a = createNode("a");
				var btndiv = createNode("div");
				var i = createNode("i");
				var column = createNode("div");
				var cardBody = createNode("div");
				var card = createNode("div");

				cardBody.classList.add("card-body");
				cardBody.classList.add("p-3")
				cardBody.classList.add("px-5")
				cardBody.classList.add("py-4")
				card.classList.add("card");
				card.classList.add("mt-3");
				column.classList.add("col-md-4");
				column.classList.add("d-flex");
                column.classList.add("align-items-stretch")
				h2.classList.add("card-title");
				p.classList.add("card-text");
				p1.classList.add("card-text");
				p2.classList.add("card-text");
				p3.classList.add("card-text");
				h2.innerHTML = data.address;
				h2.setAttribute("id", "cityName");
				p.innerHTML = "Conditions: " + wether.conditions;
				p1.innerHTML = "Description: " + wether.description;
				p2.innerHTML = "Date: " + wether.datetime;
				p3.innerHTML = "Time: " + data.currentConditions.datetime;
				a.classList.add("btn");
				a.classList.add("btn-primary");
				a.innerHTML = "More Info";
				a.classList.add("buttonStyle");

				btndiv.classList.add("btncontainer");
				cardBody.setAttribute("id", "newFavourite");
				i.setAttribute("onclick", "saveItem()")
				i.classList.add("fa-regular");
				i.classList.add("fa-heart");
				i.classList.add("align-middle");
				i.setAttribute("id", "heart");


				a.href = "./Pages/moreInfo.html?" + data.address + "?" + wether.datetime + "?" + data.currentConditions.datetime;
				
				weatherContainer.classList.add("cardStyle")
				
				append(cardBody, h2);
				append(cardBody, p);
				append(cardBody, p1);
				append(cardBody, p2);
				append(cardBody, p3);
				append(btndiv, a)
				append(btndiv, i)
				append(cardBody, btndiv)
				append(column, cardBody);
				append(weatherContainer, column);
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
	storedList.push(document.getElementById("newFavourite").innerHTML);
	localStorage.setItem("favouriteItems", JSON.stringify(storedList));
	updateFavouriteList();
	document.getElementById("newFavourite").value = "";
}

/* When called, this checks:
 - If there isn't an array, create one, and display 'no favorites' message
 - If there is one, and it is empty, display 'no favourites' message
 - If there is one, and it is populated, display items in array.
*/
function updateFavouriteList() {

	if (localStorage.getItem("favouriteItems") === null) { //  if array doesnt exist make one
		blankArray = [];
		localStorage.setItem("favouriteItems", JSON.stringify(blankArray));
		printNoFavourites();

	} else if (localStorage.getItem("favouriteItems") === "[]") { //  if array does exist but is empty
		printNoFavourites();

	} else {
		storedList = JSON.parse(localStorage.getItem("favouriteItems")); //get localstorage and turn into array

		favouritesContainer = document.createElement('div'); //go through array and write a new div for each

		storedList.forEach(function (item, index) {
			div2 = createNode('div');
			div2.setAttribute('class', 'mb-2 col-md-12');
			div2.innerHTML = "<div id='item-" + index + ")'><p>" + item + "</p></div>";
			append(favouritesContainer, div2);
		});

		document.getElementById('favouriteItems').innerHTML = favouritesContainer.innerHTML;
	}
}


// display 'no favourites' message when called
function printNoFavourites() {
	nofavourites = "<div class='mb-2 col-md-12'><p class='mb-2 mt-2 text-center p-2'><i class='fa-solid fa-star'></i></i> No Saved Favourites</p></div>";
	document.getElementById('favouriteItems').innerHTML = nofavourites;
}


