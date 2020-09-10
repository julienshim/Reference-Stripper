# Reference Stripper

Reference Stripper is a tool that remove links and special symbols from Wikipedia text and assists in manipulating text.

## Demo

* Codepen: https://codepen.io/julienshim/full/ZEzomZx
* GitHub via [gh-pages](https://yarnpkg.com/package/gh-pages): https://julienshim.github.io/reference-stripper/

## Screenshots
### Main view
<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/app.png?raw=true" width=500>

### Settings Panel
<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/settings.png?raw=true" width=500>

### Changelog
<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/changelog.png?raw=true" width=500>

## Features

- Removes footnotes insides brackets, e.g. _Lorem ipsum dolor sit amet <span style="color: red">[2]:29-33[citation needed][11]</span>_
- Removes URLs inside parentheses from hyperlinks converted to plain text, e.g. GitHub <span style="color: red">(https://github.com/)</span>
- Removes all parentheses and containing text by enabling the option in `Settings` &#9881;, e.g. The Doctor expores time and space in an unreiable time machine, the "TARDIS" <span style="color: red">(an acronym for Time and Relative Dimension in Space)</span>, which notably appears much larger on the inside than on the outside <span style="color:red">(a quality referred to as "dimensional transcendentality")</span>.
- Dark Mode by enabling the option in `Settings` &#9881;
- Create `snippets`
- Create multi-line `presets`
- Set word count limit in `Settings` &#9881;.
    - Set the word count to 0 for a traditional word count with not limits.
- Define special characters, words, acronyms to warn against (e.g. _GBP ½ / ¾_)
    - Separate special characters, words, acronyms to warn against with a space.
- Responsive web design


### Snippets

<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/snippets.gif?raw=true" width=500>

- Create simple snippets by entering text into input line.
    - Click text to copy to clipboard for pasting
- Wikipedia URLs will be converted into a special format.
    - Clicking the grey text box will copy text as-is (e.g. _Us (2019 film)_)
    - Clicking the blue `←|→` box will move parenthesized text to the front and remove the paretheses (e.g. _2019 film Us_)
    - Click the yellow ~~`(),`~~ will remove parenthesized text or text after a comma. (e.g. _Us_)
- Click red 'x' box to delete snippets.
- Click eraser to clear all snippets
- If no snippets, 'No snippets' will be displayed. Otherwise, a counter displays the number of snippets.

### Presets

Save multi-line presets by entering text into the input text area and then entering `$preset1` or `$preset2` into the input line box. Click on either the `Preset 1` or `Preset 2` buttons to recall into input text area.

<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/presets.gif?raw=true" width=500>

## Packages

This tool utilizes the following packages.

- React
- Sass
- webpack
- eslint
- Babel

## Webpack Configuration

### For deployment to GitHub via gh-pages and running locally
In the `webpack.config.js` file, the `output` and `devServer` are currently pointing to the `build` folder as required by [gh-pages](https://yarnpkg.com/package/gh-pages).

```
module.exports = {
  ...
  output: {
    path: path.join(**dirname, 'build'),
  filename: 'bundle.js',
  },
  ...
  devServer: {
    contentBase: path.join(**dirname, 'build'),
  },
};

```

Make sure that all static files are inside the `build` folder before deploying to gh-pages.

```
.
build
└─── images
     |  favicon.png
| bundle.js
| bundle.js.map
| index.html
| updates.json
```

### For running locally
If not deplying to GitHub via gh-pages, `output` and `devServer` can be pointed to a different folder. Static files should be moved to the newly defined folder as well. Make sure to update any broken paths. The following is an example utilizing the `public` folder.

```
module.exports = {
  ...
  output: {
    path: path.join(**dirname, 'public'),
  filename: 'bundle.js',
  },
  ...
  devServer: {
    contentBase: path.join(**dirname, 'public'),
  },
};

```
```
.
public
└─── images
     |  favicon.png
| bundle.js
| bundle.js.map
| index.html
| updates.json
```

## Running the app locally

1. `yarn install` to install dependencies
2. `yarn run build` to bundle the tool into static files
3. `yarn run dev-server` to start the server
4. Open `localhost:8080` in a browser

## Cross-Origin Resource Sharing (CORS)

To avoid Cross-Origin Resource Sharing (CORS) errors when hosting app on a site like [CodePen](https://codepen.io/), `updates.json` must be placed in the `public` folder of the GitHub repository.

```
.
public
| updates.json

```
