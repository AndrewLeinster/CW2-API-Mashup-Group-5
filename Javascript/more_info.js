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
            var p6 = createNode("p");
            var text = createNode("p");
            var text1 = createNode("p");
            var text2 = createNode("p");
            var text3 = createNode("p");
            var text5 = createNode("p");
            var text6 = createNode("p");
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
            p6.innerHTML =  "Date and time: " + finalDate.bold() + " " + finalTime.bold();
            p.innerHTML = "Description: " + wether.description.bold();
            p1.innerHTML = "Sunrise: " + wether.sunrise.bold();
            p2.innerHTML = "Sunset: " + wether.sunset.bold();
            text3.innerHTML = "°C";
            text2.innerHTML = wether.temp;
            p3.innerHTML =  "Temperature: " + text2.innerHTML.bold() + text3.innerHTML.bold();
            text.innerHTML = wether.windspeed;
            text1.innerHTML = "mph";
            p4.innerHTML = "Wind Speed: " + text.innerHTML.bold() + text1.innerHTML.bold();
            text5.innerHTML = wether.precip;
            text6.innerHTML = "mm";
            p5.innerHTML = "Precipitation : " + text5.innerHTML.bold() + text6.innerHTML.bold()
           
            append(column, h1);
            append(column, p6);
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