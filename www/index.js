import { Blog } from "portfolio-website";

var tablinks = document.getElementsByClassName("tablink");
const projects = Blog.new("Projects");
const career = Blog.new("Career");
const blog = Blog.new("Blog");
var currentBlog = "";

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
        currentBlog = elmnt.id;
        generateCategories(elmnt.id);
    }

    // Show the specific tab content
    var tab = document.getElementById(pageName);
    tab.style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
};

const openCategory = (pageName, elmnt, color) => {

    // Hide all elements with class="blogcontent" by default */
    var i, tabbuttons, blogcontent;
    blogcontent = document.getElementsByClassName("blogcontent");
    for (i = 0; i < blogcontent.length; i++) {
        blogcontent[i].style.display = "none";
    }

    // Remove the background color of all tabbuttons
    tabbuttons = document.getElementsByClassName("tabbutton");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    var tabs = document.getElementsByClassName(pageName);
    for (i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "block";
        tabs[i].click();
    }

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
};

const addTabListeners = () => {
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].addEventListener("click", event => {
            var subPage = tablinks[i].id.concat("Tab");
            if (subPage === "ProjectsTab" || subPage === "CareerTab" || subPage === "BlogTab") {
                subPage = "RustyTab";
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
            openCategory(tabbuttons[i].id, tabbuttons[i], 'rgb(84, 3, 104)');
        });
    };
    tabbuttons[0].click();
}

const addSideButtonListeners = () => {
    var sides = document.getElementsByClassName("sidebutton");
    for (let i = 0; i < sides.length; i++) {
        sides[i].addEventListener("click", event => {
            console.log("setting path for " + sides[i].id + " to be " + sides[i].name);
            document.getElementById("PostFrame").setAttribute("src", sides[i].name);
        });
    }
    sides[0].click();
}

const generateCategories = (blogname) => {
    var oldcats = document.getElementsByClassName("tabbutton");
    for (let i = oldcats.length - 1; i >= 0; i--) {
        oldcats[i].remove();
    }
    var oldposts = document.getElementsByClassName("sidebutton");
    for (let i = oldposts.length - 1; i >= 0; i--) {
        oldposts[i].remove();
    }

    var cats = document.getElementById("RustyCats");
    var postsElmnt = document.getElementById("RustyPosts");
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
            break;
    }

    var categories = categoryString.split("*");
    for (let i = 0; i < categories.length; i++) {
        var tabbutton = document.createElement("button");
        tabbutton.setAttribute("class", "tabbutton");
        tabbutton.setAttribute("id", categories[i]);
        tabbutton.style.width = "calc(100%/".concat(categories.length).concat(")");
        var name = document.createTextNode(categories[i]);
        tabbutton.appendChild(name);
        cats.appendChild(tabbutton);
        console.log(categories[i]);
        switch(blogname) {
            case "Projects":
                postString = projects.posts(categories[i]);
                console.log("creating sidebuttons for category ".concat(categories[i]).concat(" with poststring: ").concat(postString));
                break;
            case "Career":
                postString = career.posts(categories[i]);
                break;
            case "Blog":
                postString = blog.posts(categories[i]);
                break;
            default:
                break;
        }
        console.log(postString);
        var posts = postString.split("*");
        for (let j = 0; j < posts.length; j++) {
            var sidebutton = document.createElement("button");
            sidebutton.setAttribute("id", posts[j]);
            switch(blogname) {
                case "Projects":
                    sidebutton.setAttribute("name", projects.get_post_path(posts[j]));
                    break;
                case "Career":
                    sidebutton.setAttribute("name", career.get_post_path(posts[j]));
                    break;
                case "Blog":
                    sidebutton.setAttribute("name", blog.get_post_path(posts[j]));
                    break;
                default:
                    break;
            }

            sidebutton.setAttribute("class", "sidebutton " + categories[i] + " blogcontent");
            sidebutton.setAttribute("style","top: " + (200 + 60*j) + "px")
            var postname = document.createTextNode(posts[j]);
            sidebutton.appendChild(postname);
            postsElmnt.appendChild(sidebutton);
        }
    }


    addTabButtonListeners();
    addSideButtonListeners();
}

addTabListeners();

// Get the element with id="Home" and click on it
document.getElementById("Home").click(); 
