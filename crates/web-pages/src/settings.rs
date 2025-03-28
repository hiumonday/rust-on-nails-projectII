use crate::render;
use dioxus::prelude::*;
use db::models::User;

pub fn index(users: Vec<User>) -> String {
    render(rsx! {
        head {
            title { "Settings Page" }
            style { include_str!("../../../web-assets/style.css") }
        }
        body {
            h1 { "Settings" }
            p { "This is the settings page" }
            a { href: "/", "Back to home" }
        }
    })
}
