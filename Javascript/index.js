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
// This prevents being able to stack instances of multiple citie
function additem() {
	console.log('removing children')

	var div = document.getElementById('weather');
	while (div.firstChild) {
		div.removeChild(div.firstChild);
		console.log('removed +' + div.firstChild)
	}
	getData();
}

/* when called, this savese theme preference to a variable, 
clears loal storage and then reassigns theme preferences 
in local storage back to the value in the variable. */
function clearfavourites() {
	console.log('clearing')
	localStorage.clear();
	window.localStorage.setItem('theme', theme);
	updateFavouriteList();
}

/* This is the function that deals with getting values from weather API
and displaying them in the weather container on the page.
*/
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
			console.log(data);
			var weather = data.days;
			console.log(weather)
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
				h2.setAttribute("id", "cityName");
				p.innerHTML = "Conditions: " + wether.conditions;
				p1.innerHTML = "Description: " + wether.description;
				p2.innerHTML = "Date: " + wether.datetime;
				p3.innerHTML = "Time: " + data.currentConditions.datetime;
				a.classList.add("btn");
				a.classList.add("btn-primary");
				a.innerHTML = "More Info";
				a.classList.add("buttonStyle");
				btndiv.classList.add("btncontainer")
				cardBody.setAttribute("id", "newFavourite");
				i.setAttribute("onclick", "saveItem()")
				i.classList.add("fa-regular");
				i.classList.add("fa-heart");
				i.classList.add("align-middle");
				i.setAttribute("id", "heart");

				//This code does make something happen, but sets all cities to the same each time
				cityName = localStorage.setItem("name", JSON.stringify(data.address))

				a.href = "./Pages/moreInfo.html?" + data.address + "?" + wether.datetime + "?" + data.currentConditions.datetime;
				console.log("This")
				weatherContainer.classList.add("cardStyle");
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
	console.log(storedList);
	storedList.push(document.getElementById("newFavourite").value);
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

		console.log("favouries exist")
		storedList = JSON.parse(localStorage.getItem("favouriteItems")); //get localstorage and turn into array
		favouritesContainer = document.createElement('div'); //go through array and write a new alert box for each

		storedList.forEach(function (item, index) {

			div2 = createNode('div');
			div2.setAttribute('class', 'mb-2 col-md-12');
			div2.innerHTML = "<div><p>" + JSON.parse(localStorage.getItem("name")) + "</p></div>";
			append(favouritesContainer, div2);

		});

		document.getElementById('containerbox').innerHTML = favouritesContainer.innerHTML;

	}
}

// display 'no favourites' message when called
function printNoFavourites() {
	nofavourites = "<div class='mb-2 col-md-12'><p class='mb-2 mt-2 text-center p-2'><i class='fa-solid fa-star'></i></i> No Saved Favourites</p></div>";
	document.getElementById('containerbox').innerHTML = nofavourites;
}

// call check CSS function on window load
window.onload = (checkCSS);

// when called, checks expected value of theme, sets CSS link of index page to expected value
function checkCSS() {
	var oldlink = document.getElementById("link");
	theme = window.localStorage.getItem('theme')
	console.log(window.localStorage.getItem('theme'))

	if (theme == 'dark') {

		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", "Styling/darkmode.css");
		newlink.setAttribute("id", "link");
		theme = 'dark';
		document.getElementById("themebtn").checked = true;

	} else {

		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", "Styling/lightmode.css");
		newlink.setAttribute("id", "link");
		theme = 'light';
		document.getElementById("themebtn").checked = false;
	}

	window.localStorage.setItem('theme', theme);
	document.getElementById("head").replaceChild(newlink, oldlink);
	return theme
};

// called changeCSS function when clicked. Could not be 'onclick' as this would change it twice (ie, back to original theme)
document.getElementById("themebtn").addEventListener("mousedown", function () { changeCSS() })

// When called, this function checks current theme, and sets CSS link of index page to opposite value
function changeCSS() {
	theme = window.localStorage.getItem('theme')
	var oldlink = document.getElementById("link");

	if (theme == 'light') {

		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", "Styling/darkmode.css");
		newlink.setAttribute("id", "link");
		theme = 'dark';

	} else {

		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", "Styling/lightmode.css");
		newlink.setAttribute("id", "link");
		theme = 'light';

	}

	window.localStorage.setItem('theme', theme);
	console.log(window.localStorage.getItem('theme'))
	document.getElementById("head").replaceChild(newlink, oldlink);

}
