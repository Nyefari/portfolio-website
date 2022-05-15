mod utils;

use wasm_bindgen::prelude::*;
use std::fs;
use std::path::Path;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Post {
    name: String,
    category: String,
    text: String,
}

#[wasm_bindgen]
pub struct Blog {
    name: String,
    categories: Vec<String>,
    posts: Vec<Post>,
}

#[wasm_bindgen]
impl Blog{
    pub fn new(title: String) -> Blog {
        let path = format!(".\\{}",title);
        let categories = fs::read_dir(path).unwrap();
        let mut postvec = Vec::new();
        let mut catvec = Vec::new();
        
        for category in categories {
            let cat = category.unwrap();
            let catname = cat.file_name().into_string().unwrap();
            catvec.push(catname.clone());
            for file in fs::read_dir(cat.path()).unwrap() {
                let item = file.unwrap();
                let content = String::from_utf8_lossy(&fs::read(item.path()).unwrap()).parse().unwrap();
                postvec.push(Post {
                    name: item.file_name().into_string().unwrap(),
                    category: catname.clone(),
                    text: content,
                });
            }
        }

        Blog {
            name: title,
            categories: catvec,
            posts: postvec,
        }
    }
}