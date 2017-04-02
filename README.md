[![Code Climate](https://codeclimate.com/github/andela-fmustapha/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-fmustapha/inverted-index) [![Coverage Status](https://coveralls.io/repos/github/andela-fmustapha/inverted-index/badge.svg)](https://coveralls.io/github/andela-fmustapha/inverted-index) [![Build Status](https://travis-ci.org/andela-fmustapha/inverted-index.svg?branch=master)](https://travis-ci.org/andela-fmustapha/inverted-index)


# BookSwitch
An application that builds an index from a JSON array of one or more text objects and allows you search for words in the created Index.

## Features
- Upload file(s)
- Create an index for uploaded file(s)
- Search through indexed files 

### Why the project is useful
The project implements Inverted Index which is known to achieve fast search responses because instead of searching the text directly, it searches an index instead.

### How users can get started with the project
  - Requirements
    * To run the app locally, you need to have `node.js` installed
  - How to setup the project/Installation/Configuration
    * Clone the repo `git clone https://github.com/andela-fmustapha/inverted-index.git`
    * Change directory into `inverted-index` folder
    * Run `npm install` to install all dependencies
    * Run `gulp` to run the application
  - How to run tests
    * Run `npm test` 

### How to use the app
When the app has started: 
* Click on `Upload File` to upload valid JSON file(s)
* Upon successful upload, click on the `Create Index` button 
* Scroll down the page to see the created Index displayed in a tabular format
* Choose a file to search through a file or `All files` to search through all files, input search words and view results below on the table.


### Technology stack
* Node JS
* ES6
* AngularJS
* Gulp
* Karma 
* Jasmine

### Limitations of the project
The application can only upload JSON files in this [format](https://gist.github.com/q-ode/72019451b98f079a8d737eb7a412bf14)

### Contributing to the project
* Fork this repositry to your account
* Clone your repositry -  `git clone https://github.com/andela-fmustapha/inverted-index.git`
* Create your feature branch - `git checkout -b new-feature`
* Commit your changes - `git commit -m "did something"`
* Push to the remote branch - `git push origin new-feature`
* Open a pull request

### Troubleshooting & FAQ
- [inverted-index issues page](https://github.com/andela-fmustapha/inverted-index/issues)

### Resources
- For further research on **Inverted index**, click [here](https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html)

### License
  *  **MIT**

## Author
* **Faith Mustapha**