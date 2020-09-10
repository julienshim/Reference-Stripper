# Reference Stripper

Reference Stripper is a tool that remove links and special symbols from Wikipedia Text.

## Demo (CodePen)

https://codepen.io/julienshim/full/ZEzomZx

## Removal Features

- Removes footnoes inside brackes, e.g. Lorem ipsum dolor sit amet <span style="color: red">[2]:29-33[citation needed][11]</span>
- URLs in parenthesis from hyperlinks convereted to plain text, e.g. GitHub <span style="color: red">(https://github.com/)</span>
- Option to remove all text inside parenthesis using the ~~`( text )`~~ toggle button, e.g. The Doctor expores time and space in an unreiable time machine, the "TARDIS" <span style="color: red">(an acronym for Time and Relative Dimension in Space)</span>, which notably appears much larger on the inside than on the outside <span style="color:red">(a quality referred to as "dimensional transcendentality")</span>.

## Additional features

CURRENTLY BEING WORKED ON 2/18

<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/app.png?raw=true" width=500>
<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/settings.png?raw=true" width=500>
<img src="https://github.com/julienshim/reference-stripper/blob/master/public/images/changelog.png?raw=true" width=500>

## Webpack Configuration

In the `webpack.config.js` file, the `output` and `devServer` are currently point to the `build` folder as required by [gh-pages](https://yarnpkg.com/package/gh-pages).

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

## Deployment to GitHub Pages

```
# Cross-Origin Resource Sharing (CORS)

To avoid Cross-Origin Resource Sharing (CORS) errors when hosting app on a site like CodePen, `updates.json` must be placed in the `public` folder.

```

.
public
| updates.json

```

```
