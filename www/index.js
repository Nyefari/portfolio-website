import * as wasm from "portfolio-website";

var tablinks = document.getElementsByClassName("tablink");

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

const openSubPage = (pageName, elmnt, color) => {

    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tabbuttons
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    if(pageName == "FrameTab"){debugger;}
    var tab = document.getElementById(pageName);
    tab.style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
};

const addTabListeners = () => {
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].addEventListener("click", event => {
            var subPage = "";
            switch (tablinks.id) {
                case "Projects":
                case "Career":
                case "Blog":
                    document.getElementById("SubFrame").src = tablinks[i].id.concat(".htm");
                    subPage = "FrameTab";
                    break;
                default:
                    subPage = tablinks[i].id.concat("Tab");
                    break;
            }
            openPage(subPage, tablinks[i], 'rgb(84, 3, 104)');
        });
    };
};

const addTabButtonListeners = () => {
    // debugger;
    var tabbuttons = document.getElementsByClassName("tabbutton");
    for (let i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].addEventListener("click", event => {
            openSubPage(tabbuttons[i].id.concat("Tab"), tabbuttons[i], 'rgb(250, 250, 250)');
        });
    };
}

addTabListeners();
addTabButtonListeners();

// Get the element with id="Home" and click on it
document.getElementById("Home").click(); 
