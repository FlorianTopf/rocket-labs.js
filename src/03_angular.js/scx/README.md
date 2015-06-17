# AngularJS at Seller Center Express

Note, this notes assume that the provided vagrant box in this repository is used.

## General Structure ##

Source code is found under ./src. Grunt will copy the files to the ./public folder.
The views are already in the public folder unter ./scripts/views.

## Installation ##

* run `npm install`
* run `bower install`

## Usage ##

* to build run `grunt build` for all files or `grunt dist` for only the project files.
The second command also starts a file-watcher
* to run the application execute `node server.js` or `nodemon server.js` 
if you want to have a watcher for the server files.


