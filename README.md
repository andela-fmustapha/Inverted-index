[![Code Climate](https://codeclimate.com/github/andela-fmustapha/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-fmustapha/inverted-index) [![Coverage Status](https://coveralls.io/repos/github/andela-fmustapha/inverted-index/badge.svg)](https://coveralls.io/github/andela-fmustapha/inverted-index) [![Build Status](https://travis-ci.org/andela-fmustapha/inverted-index.svg?branch=master)](https://travis-ci.org/andela-fmustapha/inverted-index)


# BookSwitch
An application that builds an index from a JSON array of one or more text objects and allows you search for words in the created Index.

#### Features
- Accepts Upload of JSON file in below format.
```
[
  {
    "title": "Baron in Freeland",
    "text": "Baron falls into a mighty hole and enters a world full of freedom."
  },

  {
    "title": "The Lord of the Mind: The Fellowship of the Soul.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "The Criminal Mind: The beginning of destruction.",
    "text": "The mind which chooses to be criminal will always end up bringing destruction."
  }
]
```
- Creates Index of all objects with 'title' and 'text' keys in uploaded file.
- Allows Searching through the created index.

#### How to use
The Application is available:
- On the internet via [https://inverted-index-andela-fmustapha.herokuapp.com](https://inverted-index-andela-fmustapha.herokuapp.com/)
- And on any local machine after the following steps:
    ```
    git clone https://github.com/andela-fmustapha/inverted-index.git
    ```

    * Navigate to the 'inverted-index' directory via your terminal

    * Install all the dependencies (you must have installed [Nodejs](nodejs.org)):

    ```
    npm install
    ```

    - Run Tests for the application with:

    ```
    npm test
    ```

  - Start the Application with:
  ```
    gulp
    ```

  - Access the application via http://localhost:3015/


#### The application was built using the following Technologies and Services:
- Gulp
- Karma
- Jasmine
- Travis CI
- Coveralls
- Hound CI
- AngularJS
