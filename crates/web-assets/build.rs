use cache_busters::generate_static_files_code;
use std::env;
use std::path::PathBuf;

fn main() {
    let static_out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());

    // Example of multiple asset directories
    let asset_dirs = vec![
        PathBuf::from("./images"),
    ];

    let exclude_paths: Vec<PathBuf> = vec![];

    generate_static_files_code(&static_out_dir, &asset_dirs, &exclude_paths).unwrap();
}
