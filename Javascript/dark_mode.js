
document.getElementById("themebtn").addEventListener("mousedown", function () { changeCSS() })

var light = true;

function changeCSS() {

    var oldlink = document.getElementById("link");

    if (light == true) {

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "Styling/darkmode.css");
        newlink.setAttribute("id", "link");
        light = false;

    }
    else {

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "Styling/lightmode.css");
        newlink.setAttribute("id", "link");
        light = true;

    }
console.log("output")
document.getElementById("head").replaceChild(newlink, oldlink);
    
}