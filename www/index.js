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
    debugger;
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
    var path = "";
    for (let i = 0; i < sides.length; i++) {
        switch (currentBlog) {
            case "Projects":
                path = projects.get_post_path(sides[i].name)
                break;
            case "Career":
                path = career.get_post_path(sides[i].name)
                break;
            case "Blog":
                path = blog.get_post_path(sides[i].name)
                break;
            default:
                break;
        }
        sides[i].addEventListener("click", event => {
            document.getElementById("PostFrame").setAttribute("src", path)
        });
    }
    sides[0].click();
}

const generateCategories = (blogname) => {
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
            sidebutton.setAttribute("class", "sidebutton " + categories[i] + " blogcontent");
            sidebutton.setAttribute("style","top: " + (200 + 60*i) + "px")
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
