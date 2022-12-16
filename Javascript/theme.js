// on page load, checks expected value of theme, sets CSS link of index page to expected value
window.onload = () => {
    var oldlink = document.getElementById("link");
    theme = window.localStorage.getItem('theme')
    console.log(window.localStorage.getItem('theme'))

    // This if statement checks where the file is being called from and changes the links accordingly.
    // Until we did this we had two seperate files with just the links changed, so it is a large efficiency improvement
    if (window.location.href == "https://andrewleinster.github.io/CW2-API-Mashup-Group-5/" || window.location.href == "https://andrewleinster.github.io/CW2-API-Mashup-Group-5/index.html") {
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
}
else{
    if (theme == 'dark') {

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "../Styling/darkmode.css");
        newlink.setAttribute("id", "link");
        theme = 'dark';
        document.getElementById("themebtn").checked = true;

    } else {

        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "../Styling/lightmode.css");
        newlink.setAttribute("id", "link");
        theme = 'light';
        document.getElementById("themebtn").checked = false;

    }
}

    window.localStorage.setItem('theme', theme);
    document.getElementById("head").replaceChild(newlink, oldlink);

};

// called changeCSS function when clicked. Could not be 'onclick' as this would change it twice (ie, back to original theme)
document.getElementById("themebtn").addEventListener("mousedown", function () { changeCSS() })

// When called, this function checks current theme, and sets CSS link of index page to opposite value
function changeCSS() {
    theme = window.localStorage.getItem('theme')
    var oldlink = document.getElementById("link");

    if (window.location.href == "https://andrewleinster.github.io/CW2-API-Mashup-Group-5/" || window.location.href == "https://andrewleinster.github.io/CW2-API-Mashup-Group-5/index.html" ) {
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
    }
    else {

        if (theme == 'light') {

            var newlink = document.createElement("link");
            newlink.setAttribute("rel", "stylesheet");
            newlink.setAttribute("type", "text/css");
            newlink.setAttribute("href", "../Styling/darkmode.css");
            newlink.setAttribute("id", "link");
            theme = 'dark';

        } else {

            var newlink = document.createElement("link");
            newlink.setAttribute("rel", "stylesheet");
            newlink.setAttribute("type", "text/css");
            newlink.setAttribute("href", "../Styling/lightmode.css");
            newlink.setAttribute("id", "link");
            theme = 'light';

        }
    }

    window.localStorage.setItem('theme', theme);
    console.log(window.localStorage.getItem('theme'))
    document.getElementById("head").replaceChild(newlink, oldlink);

}


