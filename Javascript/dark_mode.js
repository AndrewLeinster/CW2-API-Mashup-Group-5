
document.getElementById("themebtn").addEventListener("click", function () { changeCSS()})

var light = true;

function changeCSS() {

    var oldlink = document.getElementsByTagName("link");

if (light == true) {

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", "darkmode.css");
    light = false;

}
else {

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", "lightmode.css");
    light = true;

}

    document.getElementsByTagName("head").replaceChild(newlink, oldlink);
}