window.onload = (checkCSS) => {
    var oldlink = document.getElementById("link");
    console.log("checkCSS")
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

};

document.getElementById("themebtn").addEventListener("mousedown", function () { changeCSS() })

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


