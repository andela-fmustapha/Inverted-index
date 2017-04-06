(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// book with valid contents
const validBook = require('./test/testFiles/validBook.json');
// book with invalid content
const invalidBook = require('./test/testFiles/invalidBook.json');
// empty book
const emptyBook = require('./test/testFiles/emptyBook.json');
// empty book
const malformedBook = require('./test/testFiles/malformedBook.json');
// book with few words
const smallValidBook = require('./test/testFiles/smallValidBook.json');
// Inverted Index class file
const InvertedIndex = require('../src/js/inverted-index.js').InvertedIndex;

const invertedIndex = new InvertedIndex();

describe('InvertedIndex class', () => {
  describe('Confirm class methods', () => {
    it('should check that the class has a createIndex method', () => {
      expect(typeof invertedIndex.createIndex).toBe('function');
    });

    it('should check that the class has a readFile method', () => {
      expect(typeof InvertedIndex.readFile).toBe('function');
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
  describe('Validate File', () => {
    it('should check that the contents of the uploaded file is valid',
    () => {
      expect(InvertedIndex.validateFile(validBook)).toBeTruthy();
    });

    it('should return false for empty json files', () => {
      const successMsg = { status: false };

      expect(InvertedIndex.validateFile(emptyBook)).toEqual(successMsg);
    });

    it('should return true for files with property "title" and "text" ', () => {
      const successMsg = { status: true,
        jsonContent:
        [Object({ title: 'Alice in Wonderland',
          text: 'Alice falls into a rabbit hole.' }),
          Object({ title: 'The Lord of the Rings',
            text: 'An unusual alliance of man.' }),
          Object({ title: 'The Lord of the Rings:',
            text: 'An unusual alliance of man.' })
        ] };
      expect(InvertedIndex.validateFile(smallValidBook)).toEqual(successMsg);
    });

    it('should return false for files without "title" and "text" properties',
     () => {
       const msg = false;
       expect(InvertedIndex.validateFile(invalidBook)).toEqual(msg);
     });

    it('should return false if file is not an array of JSON object',
     () => {
       expect(InvertedIndex.validateFile(invalidBook)).toBeFalsy();
     });

    it('should return false if file contains an empty array',
     () => {
       const msg = { status: false };
       expect(InvertedIndex.validateFile(malformedBook)).toEqual(msg);
     });
  });

  describe('Create Index', () => {
    it('should return mapped indices to words in a JSON file', () => {
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
      expect(invertedIndex.createIndex(smallValidBook,
        'smallValidBook.json')).toEqual(expectedResult);
    });
  });

  describe('Tokenize Words', () => {
    it('should strip out special characters from excerpt in documents', () => {
      let excerpt = 'Alice loves her ima&&gination';
      const expectedTokens = 'Alice loves her imagination';
      excerpt = InvertedIndex.tokenizeWords(excerpt);
      expect(expectedTokens).toEqual(excerpt);
    });
  });

  describe('Unique Words', () => {
    it('should ensure that a word is not repeated, for proper indexing', () => {
      let excerpt = ['alice', 'alice', 'be', 'called', 'loves', 'loves'];
      const expectedWords = ['alice', 'be', 'called', 'loves'];
      excerpt = InvertedIndex.uniqueWords(excerpt);
      expect(expectedWords).toEqual(excerpt);
    });
  });

  describe('splitAndSort Words', () => {
    it('should make all words lowercase, then it'
    + 'should ensure that sentences are splitted into an array of words,'
    + 'then sorted alphabetically to make searching more intuitive'
    + 'and make indexing more accurate', () => {
      let excerpt = 'The Lord of the Rings';
      const expectedResult = ['lord', 'of', 'rings', 'the'];
      excerpt = InvertedIndex.splitAndSort(excerpt);
      expect(expectedResult).toEqual(excerpt);
    });
  });

  describe('Get Index', () => {
    it('should verify that index has been created', () => {
      expect(Object.keys(invertedIndex.getIndex('smallValidBook.json')).length)
        .toBeGreaterThan(0);
    });
  });

  describe('Search index', () => {
    describe('Search index of words', () => {
      it('should return true if search term is a string', () => {
        const term = 'Wonderland of rings';
        expect(Object.keys(invertedIndex.searchIndex(term,
           'smallValidBook.json')))
        .toBeTruthy();
      });

      it('should return false if search term is not a string', () => {
        const term = [];
        expect(invertedIndex.searchIndex(term, 'smallValidBook.json'))
        .toBeFalsy();
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
        searchTerm = invertedIndex
          .searchIndex('Alice, and her unusual imagination',
        'smallValidBook.json');
        expect(Object.keys(searchTerm)).toEqual(Object.keys(requiredOutput));
        expect(searchTerm).toEqual(requiredOutput);
      });

      it('should search through all files that are indexed', () => {
        const output = {
          'smallValidBook.json':
          {
            alice: [0],
            and: [],
            her: [],
            imagination: [],
            unusual: [1, 2]
          }

        };
        let term = {};
        term = invertedIndex.searchIndex('Alice, and her unusual imagination',
        'All');
        expect(Object.keys(term)).toEqual(Object.keys(output));
        expect(term).toEqual(output);
      });
    });
  });
});

},{"../src/js/inverted-index.js":7,"./test/testFiles/emptyBook.json":2,"./test/testFiles/invalidBook.json":3,"./test/testFiles/malformedBook.json":4,"./test/testFiles/smallValidBook.json":5,"./test/testFiles/validBook.json":6}],2:[function(require,module,exports){
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
  }

  /**
   *
   *
   * @param {Object} file - Javascript object containing file properties
   * @returns {Object} fileContent - content of the read file
   *
   * @memberOf InvertedIndex
   */
  static readFile(file) {
    let fileContent;
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          fileContent = JSON.parse(event.target.result);
          const response = InvertedIndex.validateFile(fileContent);
          resolve(response);
        };
        reader.readAsText(file);
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
  *
   *
   * @param {Object} jsonContent
   * @returns{Object} isValid - returns true and JSON content for valid files
   * @returns{Object} invalidStructureError - returns a name and message
   *   for invalid content
   * @memberOf InvertedIndex
   */
  static validateFile(jsonContent) {
    let isValid = {};
    const invalidStructureError = {
      name: 'validate file structure',
      message: 'File structure is invalid'
    };
    if (Object.keys(jsonContent).length === 0 &&
       typeof jsonContent === 'object') {
      isValid = {
        status: false
      };
      return isValid;
    }
    try {
      jsonContent.forEach((doc) => {
        if (!doc.title || !doc.text) {
          throw invalidStructureError;
        } else {
          isValid = {
            status: true,
            jsonContent
          };
          return isValid;
        }
      });
    } catch (error) {
      if (error.name === 'validate file structure') return false;
      throw error;
    }
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
   * @returns{String} text -
   *  a string of spaced words with no unwanted characters
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
   * @param {Object} doc - an object containing a string of characters.
   * @returns{Object} docObject - an object containing an array of words.
   *
   * @memberOf InvertedIndex
   */
  static splitAndSort(doc) {
    const words = doc.toLowerCase().split(' ').sort();
    doc = InvertedIndex.uniqueWords(words);
    return doc;
  }

  /**
   *
   *
   * @static
   * @param {Object} doc - single object of a JSON formatted file
   * @returns{Object} concatenatedText -
   *  returns the concatenated values of object keys
   *
   * @memberOf InvertedIndex
   */
  static concatenateText(doc) {
    // if a document exists? combine title and text to split at once
    let concatenatedText = {};
    concatenatedText = `${doc.title} ${doc.text}`;
    return concatenatedText;
  }

  /**
   *
   *
   * @param {Array} file - contents of a JSON formatted file
   * @param {String} filename - name of the file
   * @returns{Object} this.indexedFiles -
   *  contains filenames and their corresponding contents.
   *
   * @memberOf InvertedIndex
   */
  createIndex(file, filename) {
    const indices = {};
    const docWords = {};
    file.forEach((doc, key) => {
      const joinedkeys = InvertedIndex.concatenateText(doc);
      const tokenizedWords = InvertedIndex.tokenizeWords(joinedkeys);
      docWords[key] = InvertedIndex.splitAndSort(tokenizedWords);
    });
    Object.keys(docWords).forEach((keys) => {
      docWords[keys].forEach((word) => {
        if (!Object.prototype.hasOwnProperty.call(indices, word)) {
          indices[word] = [Number(keys)];
        } else { indices[word].push(Number(keys)); }
      });
    });
    this.indexedFiles[filename] = indices;
    return this.indexedFiles;
  }

  /**
   *
   *
   * @param {String} filename - the name of the JSON file
   * @returns{Object} this.indexedFiles -
   *  displays file title and indices of words in the file
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
   * @param {String} file - the name of the file
   * @returns{Object} searchOutput - the words and corresponding indices
   *
   * @memberOf InvertedIndex
   */
  searchIndex(searchWords, file) {
    const searchOutput = {};
    if (typeof searchWords !== 'string') {
      return false;
    }
    searchWords = InvertedIndex.tokenizeWords(searchWords);
    const sortedWords = InvertedIndex.splitAndSort(searchWords);
    if (file !== 'All') {
      const index = this.indexedFiles[file];
      sortedWords.forEach((word) => {
        if (index[word]) {
          searchOutput[word] = index[word];
        } else {
          searchOutput[word] = [];
        }
      });
      this.searchIndices[file] = searchOutput;
    } else {
      const index = this.indexedFiles;
      Object.keys(index).forEach((filename) => {
        const indexedFile = this.indexedFiles[filename];
        sortedWords.forEach((word) => {
          if (indexedFile[word]) {
            searchOutput[word] = indexedFile[word];
          } else {
            searchOutput[word] = [];
          }
        });
        this.searchIndices[filename] = searchOutput;
      });
    }
    return this.searchIndices;
  }
}

module.exports.InvertedIndex = InvertedIndex;

},{}]},{},[1])