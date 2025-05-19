# [escvienna2026.com](https://escvienna2026.com)

- Header image downloaded from [Pixabay](https://pixabay.com/photos/vienna-city-hall-building-7971742/)

## Dev

The `gh-pages` branch contains only the `dist/` folder and is used for GitHub Pages.

```bash
# Start the server and serves project
# need to call language dir since the index.html is only created post build
# http://localhost:4321/de
npm run dev      
npm run build    # Generate the static site in /dist
npm run preview  # Starts server and serves /dist (e.g., http://localhost:4321)
npm run deploy   # Pushes the contents of /dist to the gh-pages branch
```

## TODO

- Build multilanguage variants from language files  
- Submit to Google index  
- Add no-cookie web analytics  
