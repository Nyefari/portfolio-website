mod utils;

use wasm_bindgen::prelude::*;
use std::{fs, env};
use std::path::Path;

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
        let current_dir = &env::current_dir().unwrap();
        let path = Path::new(current_dir);
        log!("Creating new Blog with path: {:?}", path);
        let categories = fs::read_dir(path);
        let mut postvec = Vec::new();
        let mut catvec = Vec::new();
        
        for category in categories.unwrap() {
            let cat = category.unwrap();
            let catname = cat.file_name().into_string().unwrap();
            catvec.push(catname.clone());
            for file in fs::read_dir(cat.path()).unwrap() {
                let item = file.unwrap();
                let content = item.path().into_os_string().into_string().unwrap();
                postvec.push(Post {
                    name: item.file_name().into_string().unwrap(),
                    category: catname.clone(),
                    path: content,
                });
            }
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