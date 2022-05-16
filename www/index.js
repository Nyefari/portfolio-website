import { Blog } from "portfolio-website";

var tablinks = document.getElementsByClassName("tablink");
debugger;
const projects = Blog.new("Projects");
const career = Blog.new("Career");
const blog = Blog.new("Blog");

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

    if (pageName == "RustyTab") {
        generateCategories(elmnt.id);
    }

    // Show the specific tab content
    var tab = document.getElementById(pageName);
    tab.style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
};

const openCategory = (pageName, elmnt, color) => {

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
                    subPage = "RustyTab";
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
            openCategory(tabbuttons[i].id.concat("Tab"), tabbuttons[i], 'rgb(250, 250, 250)');
        });
    };
}

const generateCategories = (blogname) => {
    var cats = document.getElementById("RustyCats");
    var posts = document.getElementById("RustyPosts");
    var categoryString = "";
    var postString = "";
    switch(blogname) {
        case "Projects":
            categoryString = projects.categories();
            break;
        case "Career":
            categoryString = career.categories();
            break;
        case "Blog":
            categoryString = blog.categories();
            break;
        default:
            debugger;
            break;
    }

    var categories = categoryString.split("*");
    for (let i = 0; i < categories.length; i++) {
        var tabbutton = document.createElement("button");
        tabbutton.setAttribute("class", "tabbutton");
        tabbutton.setAttribute("id", categories[i]);
        tabbutton.setAttribute("style", "width: 100%/" + categories.length)
        var name = document.createTextNode(categories[i]);
        tabbutton.appendChild(name);
        cats.appendChild(tabbutton);

        switch(blog) {
            case "Projects":
                postString = projects.posts(categories[i]);
                break;
            case "Career":
                postString = career.posts(categories[i]);
                break;
            case "Blog":
                postString = blog.posts(categories[i]);
                break;
            default:
                debugger;
                break;
        }
        var posts = postString.split("*");
        for (let j = 0; j < posts.length; j++) {
            var sidebutton = document.createElement("button");
            sidebutton.setAttribute("name", posts[j]);
            sidebutton.setAttribute("class", "sidebutton " + categories[i]);
            sidebutton.setAttribute("style","top: " + (200 + 60*i) + "px")
            var postname = document.createTextNode(posts[j]);
            sidebutton.appendChild(postname);
            posts.appendChild(sidebutton);
        }
    }


    addTabButtonListeners();
    addSideButtonListeners();
}

addTabListeners();

// Get the element with id="Home" and click on it
document.getElementById("Home").click(); 
