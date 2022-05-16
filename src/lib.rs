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
        let mut result = String::from("");
        for category in &self.categories {
            result.push_str(&category);
            result.push('*');
        }
        result
    }
    
    pub fn posts(&self, category: String) -> String {
        let mut result = String::from("");
        for post in &self.posts {
            if post.category == category {
                result.push_str(&post.name);
                result.push('*');
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