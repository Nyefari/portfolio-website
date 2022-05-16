mod utils;

use wasm_bindgen::prelude::*;

extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(Clone)]
pub struct Post {
    name: String,
    category: String,
    path: String,
}

#[wasm_bindgen]
pub struct Blog {
    categories: Vec<String>,
    posts: Vec<Post>,
}

#[wasm_bindgen]
impl Blog{
    pub fn new(title: String) -> Blog {
        utils::set_panic_hook();
        log!("Creating new Blog with title: {}", title);
        //let current_dir = &env::current_dir().unwrap();
        //let path = Path::new(current_dir);
        //log!("Creating new Blog with path: {:?}", path);
        // let categories = fs::read_dir(path);
        let mut categories = Vec::new();
        let mut postvec = Vec::new();
        match title.as_str(){
            "Projects" => {
                categories.extend(["Current","Completed","Planned"]);

                postvec.push(
                    Post {
                        name: String::from("Portfolio Website"),
                        category: String::from("Current"),
                        path: String::from("website.htm"),
                    }
                );
            },
            "Career" => {
                categories.extend(["Current","Past"]);

                postvec.push(
                    Post {
                        name: String::from("Service Desk Specialist"),
                        category: String::from("Current"),
                        path: String::from("bluepearl.htm"),
                    }
                );

                postvec.push(
                    Post {
                        name: String::from("Lead Programmer"),
                        category: String::from("Current"),
                        path: String::from("worldscripting.htm"),
                    }
                );

                postvec.push(
                    Post {
                        name: String::from("Lowe's Positions"),
                        category: String::from("Past"),
                        path: String::from("lowes.htm"),
                    }
                );

                postvec.push(
                    Post {
                        name: String::from("Navy"),
                        category: String::from("Past"),
                        path: String::from("navy.htm"),
                    }
                );
            },
            "Blog" => {
                categories.extend(["Current","2022"]);
            }
            _ => {},
        }
        let mut catvec = Vec::new();
        
        for category in categories {
            let cat = category;
            catvec.push(String::from(cat));
        }

        Blog {
            categories: catvec,
            posts: postvec,
        }
    }

    pub fn categories(&self) -> String {
        let mut result = String::from(&self.categories[0]);
        for i in 1..self.categories.len() {
            result.push('*');
            result.push_str(&self.categories[i]);
        }
        result
    }
    
    pub fn posts(&self, category: String) -> String {
        let filteredposts: Vec<Post> = self.posts.iter().filter(|p| p.category == category).cloned().collect();
        log!("Returning {} Posts from category {}", filteredposts.len(), category);
        let mut result = String::from("");
        if filteredposts.len() != 0 {
            result = String::from(&filteredposts[0].name);
            for i in 1..filteredposts.len() {
                result.push('*');
                result.push_str(&filteredposts[i].name);
            }
        }
        result
    }

    pub fn get_post_path(&self, postname: String) -> String {
        let mut result = String::from("");
        for post in &self.posts {
            if post.name == postname {
                result.push_str(&post.path);
                break;
            }
        }
        result
    }
}