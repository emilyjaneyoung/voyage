# Voyage - Front-end Starter

[![forthebadge](http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](http://forthebadge.com)

Following a Scalable and Modular Architecture for CSS.
Borrowing heavily from SMACSS, BEM & OOCSS.

[![Build Status](https://travis-ci.org/livingincircuits/voyage.svg)](https://travis-ci.org/livingincircuits/voyage)
[![Code Climate](https://codeclimate.com/github/livingincircuits/voyage/badges/gpa.svg)](https://codeclimate.com/github/livingincircuits/voyage)
[![Dependency Status](https://david-dm.org/livingincircuits/voyage.svg)](https://david-dm.org/livingincircuits/voyage)

## Prerequisites

1. [Node.js](http://nodejs.org/)
2. [Node Sass](https://www.npmjs.com/package/node-sass)
3. [Gulp](http://gulpjs.com/)

## Node Sass

`npm install node-sass`

Use `npm rebuild node-sass` if updated.

## Gulp Installation

* npm install --global gulp
* cd to project root
* npm install
* run gulp by typing 'gulp'

## Running Gulp

* Run 'gulp'
* Run 'gulp sprites' to create the SVG spritesheet and PNG fallbacks.
* Once you have run the above, open svg-symbols.svg inside img/svg and paste this code into a file that you include in your header
with the wrapping <div style="height: 0; width: 0; position: absolute; visibility: hidden"></div>

## EditorConfig

EditorConfig helps to maintain consistent coding styles between different editors
Install `EditorConfig` with [Package Control](https://sublime.wbond.net) and restart Sublime.

## License

[MIT](http://opensource.org/licenses/MIT)
