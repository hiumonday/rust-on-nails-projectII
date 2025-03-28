watch:
    mold -run cargo watch --workdir /workspace/ -w crates/web-server -w crates/db --no-gitignore -x "run --bin web-server" -w crates/web-pages

tailwind:
    cd /workspace/crates/web-assets && tailwind-extra -i ./input.css -o ./dist/tailwind.css --watch
