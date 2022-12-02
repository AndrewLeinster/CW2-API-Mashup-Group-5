// create helper functions
function createNode(element)
{
    return document.createElement(element);
}

function append(parent, el)
{
    return parent.appendChild(el);
}

document.getElementById("submit").addEventListener("click", function(){getData()});
function getData() {
    const weatherContainer = document.getElementById("weather");
    let searchedCity = document.getElementById("location").value;
    // let searchedTime = document.getElementById("dateTime").value;
    // this gets next forecast
    // you can only get forecasts 3 hourly, so 12, 3, 6, so unusre how this works
    url = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=6fdb5d56148a837763b84d0f303bf297";
    console.log(url)
    console.log(searchedCity)
    fetch(url)
        // convert to JSON
        .then((resp) => resp.json())
        .then(function(data) 
        {
            console.log(data);
            var list = data.list;
            console.log(list)
            return list.map(function(list){
                var weather = list.weather;
                return weather.map(function(weath){
                    var h1 = createNode("h1");
                    var p = createNode("p");
                    h1.innerHTML = "Weather: " + weath.main;
                    p.innerHTML = "Description: " + weath.description;
                    append(weatherContainer, h1);
                    append(weatherContainer, p);
                })
                
            })
        })
        .catch(function(error) {
            console.log(error);
          });
}