/*Create helper functions*/
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

currentLocation = window.location.href;
var searchString = currentLocation.split("?");
var city = searchString[1].toLowerCase();
let date = searchString[2];
var time = searchString[3];


//api to get photos of the city. Doesn't have every city, but better than nothing?
let cityUrl = "https://api.teleport.org/api/urban_areas/slug:" + city + "/images/"
//let cityUrl = "https://api.teleport.org/api/urban_areas/slug:glasgow/images/"
const moreInfobgContainer = document.getElementById("moreInfobg");
fetch(cityUrl)
    .then((resp) => resp.json())
    .then(function (data2) {
        var cities = data2.photos;
        return cities.map(function(city) {
            var bgimage = createNode("div");
            var img = createNode("img");
            bgimage.classList.add("row");
            img.classList.add("mainimg");
            img.src = city.image.web;
            append(bgimage, img)
            append(moreInfobgContainer, bgimage);
        })


    })

    .catch(function (error) {
        console.log(error)
    });

//get all weather data
let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + city + "/" + date + "T" + time + "/?unitGroup=uk&key=5KP9KEBYVW933PV52J78QTRGX&include=current";
const moreInfoContainer = document.getElementById("moreInfo");
fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
        var weather = data.days;
        return weather.map(function (wether) {
            var h1 = createNode("h1");
            var p = createNode("p");
            var p1 = createNode("p");
            var p2 = createNode("p");
            var p3 = createNode("p");
            var p4 = createNode("p");
            var p5 = createNode("p");
            var text = createNode("p");
            var text1 = createNode("p");
            var text2 = createNode("p");
            var text3 = createNode("p");
            var text4 = createNode("p");
            var text5 = createNode("p");
            var column = createNode("div");
            var a = createNode("a");


            // make the date in a nicer more readable format
            let finalDate = date.split("-").reverse().toString().replaceAll(",","/");
            
            //remove final zeros from the time to make it look nicer
            let finalTime = time.split(":");;
            finalTime.pop();
            finalTime = finalTime.toString().replaceAll(",",":")
            //column.classList.add("col-md-6")
            column.classList.add("mt-5");
            a.classList.add("btn");
            a.classList.add("btn-primary");
            a.classList.add("buttonStyle");
            a.classList.add("btn-primary:hover");
            h1.innerHTML = data.resolvedAddress;
            text4.innerHTML = "Date and time: ";
            p4.innerHTML = text4.innerHTML.bold() + finalDate + " " + finalTime;
            text.innerHTML = "Description: ";
            p.innerHTML = text.innerHTML.bold() + wether.description;
            text1.innerHTML = "Sunrise: "
            p1.innerHTML = text1.innerHTML.bold() + wether.sunrise;
            text2.innerHTML = "Sunset: ";
            p2.innerHTML = text2.innerHTML.bold() + wether.sunset;
            text3.innerHTML = "Temperature: "
            p3.innerHTML = text3.innerHTML.bold() + wether.temp + "°C";
            text4.innerHTML = "Wind Speed: "
            p4.innerHTML = text4.innerHTML.bold() + wether.windspeed + "mph";
            text5.innerHTML = "Precipitation : "
            p5.innerHTML = text5.innerHTML.bold() + wether.precip + "mm";
           
            append(column, h1);
            append(column, p4);
            append(column, p);
            append(column, p1);
            append(column, p2);
            append(column, p3);
            append(column, p4);
            append(column, p5);
            append(moreInfoContainer, column);
        })


    })

    .catch(function (error) {
        console.log(error)
    });