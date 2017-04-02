(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const validBook = require('./test/testFiles/validBook.json');  //  book with valid contents
const invalidBook = require('./test/testFiles/invalidBook.json'); //  book with invalid content
const emptyBook = require('./test/testFiles/emptyBook.json');   //  empty book
const malformedJSON = require('./test/testFiles/malformed.json');
const smallBook = require('./test/testFiles/smallValidBook.json');
const InvertedIndex = require('../src/js/inverted.js').InvertedIndex;

const invertedIndex = new InvertedIndex();

describe('InvertedIndex class', () => {
  // invertedIndex.createIndex('validBook.json', validBook);
 // invertedIndex.createIndex('secondBook.json', secondBook);

  describe('InvertedIndex class', () => {
    it('should check that the class has a createIndex method', () => {
      expect(typeof invertedIndex.createIndex).toBe('function');
    });

    it('should check that the class has a readFile method', () => {
      expect(typeof invertedIndex.readFile).toBe('function');
    });

    it('should check that the class has a validateFile method', () => {
      expect(typeof InvertedIndex.validateFile).toBe('function');
    });

    it('should check that the class has a uniqueWords method', () => {
      expect(typeof InvertedIndex.uniqueWords).toBe('function');
    });

    it('should check that the class has a tokenizeWords method', () => {
      expect(typeof InvertedIndex.tokenizeWords).toBe('function');
    });

    it('should check that the class has a splitAndSort method', () => {
      expect(typeof InvertedIndex.splitAndSort).toBe('function');
    });

    it('should check that the class has a getIndex method', () => {
      expect(typeof InvertedIndex.concatenateText).toBe('function');
    });

    it('should check that the class has a searchIndex method', () => {
      expect(typeof invertedIndex.searchIndex).toBe('function');
    });
  });

  // describe('validateFile', () => {
  it('should check that the contents of the uploaded file is valid',
    () => {
      expect(InvertedIndex.validateFile(validBook)).toBeTruthy();
    });

  it('should return false for empty json files', () => {
    expect(InvertedIndex.validateFile(emptyBook)).toBeFalsy();
  });

  it('should return true for uploaded files with property "title" and "text" ', () => {
    expect(InvertedIndex.validateFile(validBook)).toBeTruthy();
  });

  it('should return false for files without "title" and "text" properties',
     () => {
       expect(InvertedIndex.validateFile(invalidBook)).toBeFalsy();
     });

  it('should return false if file is not an array of JSON object',
     () => {
       expect(InvertedIndex.validateFile(invalidBook)).toBeFalsy();
     });

  it('should return false if file contains an empty array',
     () => {
       expect(InvertedIndex.validateFile(malformedJSON)).toBeFalsy();
     });

//      it('should return false if file is a JSON file but not an array of an array',
//      () => {
//        expect(InvertedIndex.validateFile(notValid)).toBeFalsy();
//      });
  // });
  // (limitations of the product)

  describe('Create Index', () => {
    it('should return an mapped indices to words in a JSON file', () => {
      const expectedResult =
        { 'smallValidBook.json':
        { a: [0],
          alice: [0],
          falls: [0],
          hole: [0],
          in: [0],
          into: [0],
          rabbit: [0],
          wonderland: [0],
          alliance: [1, 2],
          an: [1, 2],
          lord: [1, 2],
          man: [1, 2],
          of: [1, 2],
          rings: [1, 2],
          the: [1, 2],
          unusual: [1, 2] } };
      expect(invertedIndex.createIndex(smallBook, 'smallValidBook.json')).toEqual(expectedResult);
    });
  });

  describe('Tokenize words', () => {
    it('should strip out special characters from excerpt in documents', () => {
      let excerpt = 'Alice loves her ima&&gination';
      const expectedTokens = 'Alice loves her imagination';
      excerpt = InvertedIndex.tokenizeWords(excerpt);
      expect(expectedTokens).toEqual(excerpt);
    });
  });


  describe('Get Index', () => {
    it('should verify that index has been created', () => {
      expect(Object.keys(invertedIndex.getIndex('smallValidBook.json')).length)
        .toBeGreaterThan(0);
    });
  });

  describe('Search index', () => {
    it('should return true if search term is a string', () => {
      const term = 'Wonderland of rings';
      expect(Object.keys(invertedIndex.searchIndex(term, 'smallValidBook.json')))
      .toBeTruthy();
    });
  });

  it('should search through single files that are indexed', () => {
    const requiredOutput = {
      'smallValidBook.json':
      {
        alice: [0],
        and: [],
        her: [],
        imagination: [],
        unusual: [1, 2]
      }
    };
    let searchTerm = {};
    searchTerm = invertedIndex.searchIndex('Alice, and her unusual imagination',
      'smallValidBook.json');
    expect(Object.keys(searchTerm)).toEqual(Object.keys(requiredOutput['smallValidBook.json']));
    expect(searchTerm).toEqual(requiredOutput['smallValidBook.json']);
  });
});

},{"../src/js/inverted.js":7,"./test/testFiles/emptyBook.json":2,"./test/testFiles/invalidBook.json":3,"./test/testFiles/malformed.json":4,"./test/testFiles/smallValidBook.json":5,"./test/testFiles/validBook.json":6}],2:[function(require,module,exports){
module.exports={}
},{}],3:[function(require,module,exports){
module.exports=[
  {
    "title": "Baron in Freeland",
    "t": "Baron falls into a mighty hole and enters a world full of freedom."
  },

  {
    "title": "The Lord of the Mind: The Fellowship of the Soul.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "The Lord of the Mind: The Fellowship of the heart.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
},{}],4:[function(require,module,exports){
module.exports=[
  
]
},{}],5:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole."
  },

  {
    "title": "The Lord of the Rings",
    "text": "An unusual alliance of man."
  },
  {
    "title": "The Lord of the Rings:",
    "text": "An unusual alliance of man."
  }
]
},{}],6:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]
},{}],7:[function(require,module,exports){
/**
 *
 * @class InvertedIndex
 */
class InvertedIndex {

  /**
   * Creates an instance of InvertedIndex.
   * @memberOf InvertedIndex
   */
  constructor() {
    this.searchIndices = {};
    this.indexedFiles = {};
    this.allTitles = {};
  }

  /**
   *
   *
   * @param {Object} eachFile - Javascript object containing file properties
   * @returns {Object} fileContent - content of the read file
   *
   * @memberOf InvertedIndex
   */
  readFile(eachFile) {
    let fileContent;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(eachFile);
      reader.onload = ((event) => {
        try {
          fileContent = JSON.parse(event.target.result);
          resolve(fileContent);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  /**
  *
   *
   * @param {Object} jsonContent
   * @returns{Boolean} isValid - returns true if a json file is valid and false otherwise
   *
   * @memberOf InvertedIndex
   */
  static validateFile(jsonContent) {
    if (Object.keys(jsonContent).length === 0 && typeof jsonContent === 'object') {
      return false;
    } let isValid = true;
    jsonContent.forEach((doc) => {
      if (!doc.title || !doc.text) {
        isValid = false;
      }
    });
    return isValid;
  }

  /**
   *
   *
   * @static
   * @param {Array} words -takes in an array of words with possible duplicates.
   * @returns{Array} item -returns an array of words without duplicates.
   *
   * @memberOf InvertedIndex
   */
  static uniqueWords(words) {
    if (Array.isArray(words)) {
      const checked = {};
      return words.filter((item) => {
        if (!checked[item]) {
          checked[item] = true;
          return item;
        }
        return null;
      });
    }
    return ['invalid data type supplied'];
  }

  /**
   *
   *
   * @static
   * @param {String} text - a string of spaced words with unwanted characters
   * @returns{String} text - a string of spaced words with no unwanted characters
   *
   * @memberOf InvertedIndex
   */
  static tokenizeWords(text) {
    const invalid = /[.,/#!$%^&*;:{}=\-_`~()]/g;
    text = text.replace(invalid, '');
    return text;
  }
  /**
   *
   *
   * @static
   * @param {Object} docObject - an object containing a string of characters.
   * @returns{Object} docObject - an object containing an array of words.
   *
   * @memberOf InvertedIndex
   */
  static splitAndSort(docObject) {
    const words = docObject.toLowerCase().split(' ').sort();
    docObject = InvertedIndex.uniqueWords(words);
    return docObject;
  }

  /**
   *
   *
   * @static
   * @param {Object} jContent - single object of a JSON formatted file
   * @returns{Object} concatenatedText - returns the concatenated values of object keys
   *
   * @memberOf InvertedIndex
   */
  static concatenateText(jContent) {
    // if a document exists? combine title and text to split at once
    let concatenatedText = {};
    concatenatedText = `${jContent.title} ${jContent.text}`;
    return concatenatedText;
  }

  /**
   *
   *
   * @param {Array} book - contents of a JSON formatted file
   * @param {String} filename - name of the file
   * @returns{Object} this.indexedFiles - contains filenames and their corresponding contents.
   *
   * @memberOf InvertedIndex
   */
  createIndex(book, filename) {
    const indices = {};
    const splittedWords = {};
    book.forEach((doc, key) => {
      const joinedkeys = InvertedIndex.concatenateText(doc);
      const tokenizedWords = InvertedIndex.tokenizeWords(joinedkeys);
      splittedWords[key] = InvertedIndex.splitAndSort(tokenizedWords);
    });
    // index words
    Object.keys(splittedWords).forEach((keys) => {
      splittedWords[keys].forEach((words) => {
        if (!indices.hasOwnProperty(words)) {
          indices[words] = [Number(keys)];
        } else { indices[words].push(Number(keys)); }
      });
    });
    this.indexedFiles[filename] = indices;
    return this.indexedFiles;
  }

  /**
   *
   *
   * @param {String} filename - the name of the JSON file
   * @returns{Object} this.indexedFiles - displays file title and indices of words in the file
   *
   * @memberOf InvertedIndex
   */
  getIndex(filename) {
    return this.indexedFiles[filename]; // Display a particular file
  }

  /**
   *
   *
   * @param {String} searchWords - the words you require indices for
   * @param {String} fileName - the name of the file
   * @returns{Object} searchOutput - the words and corresponding indices
   *
   * @memberOf InvertedIndex
   */
  searchIndex(searchWords, fileName) {
    const searchOutput = {};
    // if(fileName==='All') return
    if (typeof searchWords !== 'string') {
      return false;
    }
    searchWords = InvertedIndex.tokenizeWords(searchWords);
    const sortedWords = InvertedIndex.splitAndSort(searchWords);
    // console.log(sortedWords)
    const index = this.indexedFiles[fileName];
    sortedWords.forEach((word) => {
      if (index[word]) {
        searchOutput[word] = index[word];
      } else {
        searchOutput[word] = [];
      }
    });
    this.searchIndices[fileName] = searchOutput;
    return searchOutput;
  }
}

module.exports.InvertedIndex = InvertedIndex;

},{}]},{},[1])