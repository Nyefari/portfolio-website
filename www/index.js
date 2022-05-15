import * as wasm from "portfolio-website";

var tablinks = document.getElementsByClassName("tablink");

const addTabListeners = () => {
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].addEventListener("click", event => {
            openPage(tablinks[i].id.concat("Tab"), tablinks[i], 'rgb(84, 3, 104)');
        });
    };
};

const openPage = (pageName, elmnt, color) => {

    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    var tab = document.getElementById(pageName);
    tab.style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
};

addTabListeners();

// Get the element with id="Home" and click on it
document.getElementById("Home").click(); 
