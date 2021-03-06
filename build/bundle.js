(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const validBook2 = require('./test/testFiles/validBook2.json');
const invalidBook = require('./test/testFiles/invalidBook.json');
const emptyBook = require('./test/testFiles/emptyBook.json');
const malformedBook = require('./test/testFiles/malformedBook.json');
const smallValidBook = require('./test/testFiles/smallValidBook.json');
const InvertedIndex = require('../src/js/InvertedIndex.js').InvertedIndex;

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

    it('should check that the class has a tokenizeText method', () => {
      expect(typeof InvertedIndex.tokenizeText).toBe('function');
    });

    it('should check that the class has a removeBadCharacters method', () => {
      expect(typeof InvertedIndex.removeBadCharacters).toBe('function');
    });

    it('should check that the class has a getIndex method', () => {
      expect(typeof invertedIndex.getIndex).toBe('function');
    });

    it('should check that the class has a searchIndex method', () => {
      expect(typeof invertedIndex.searchIndex).toBe('function');
    });
  });

  describe('The validateFile method', () => {
    it('should check that the contents of the uploaded file is valid',
      () => {
        const msg = {
          status: true,
          jsonContent:
          [
            {
              title: 'Alice in Wonderland',
              text: 'Alice falls into a rabbit hole.'
            },

            {
              title: 'The Lord of the Rings',
              text: 'An unusual alliance of man.'
            },
            {
              title: 'The Lords of the Rings',
              text: 'An unusual alliance of man.'
            }
          ]
        };
        expect(InvertedIndex.validateFile(smallValidBook)).toEqual(msg);
      });

    it('should return false for empty json files', () => {
      const successMsg = { status: false };
      expect(InvertedIndex.validateFile(emptyBook)).toEqual(successMsg);
    });

    it('should return true for files with property "title" and "text" ', () => {
      const successMsg = {
        status: true,
        jsonContent:
        [
          {
            title: 'Alice in Wonderland',
            text: 'Alice falls into a rabbit hole.'
          },

          {
            title: 'The Lord of the Rings',
            text: 'An unusual alliance of man.'
          },
          {
            title: 'The Lords of the Rings',
            text: 'An unusual alliance of man.'
          }
        ]
      };
      expect(InvertedIndex.validateFile(smallValidBook)).toEqual(successMsg);
    });

    it('should return false for files without "title" and "text" properties',
      () => {
        const msg = { status: false };
        expect(InvertedIndex.validateFile(invalidBook)).toEqual(msg);
      });

    it('should return false if file is not an array of JSON object',
      () => {
        const msg = { status: false };
        expect(InvertedIndex.validateFile(invalidBook)).toEqual(msg);
      });

    it('should return false if file contains an empty array',
      () => {
        const msg = { status: false };
        expect(InvertedIndex.validateFile(malformedBook)).toEqual(msg);
      });
  });

  describe('The createIndex method', () => {
    it('should return mapped indices to words in a JSON file', () => {
      invertedIndex.createIndex(smallValidBook, 'smallValidBook.json');
      const result =
        {
          a: [0],
          alice: [0],
          falls: [0],
          hole: [0],
          in: [0],
          into: [0],
          rabbit: [0],
          wonderland: [0],
          alliance: [1, 2],
          an: [1, 2],
          lord: [1],
          man: [1, 2],
          of: [1, 2],
          rings: [1, 2],
          the: [1, 2],
          unusual: [1, 2],
          lords: [2] };
      expect(invertedIndex.getIndex('smallValidBook.json')).toEqual(result);
    });

    it('should return an object for a valid file', () => {
      invertedIndex.createIndex(validBook2, 'validBook2.json');
      expect(invertedIndex.getIndex('validBook2.json')
        instanceof Object).toBeTruthy();
    });
  });

  describe('The removeBadCharacters method', () => {
    it('should strip out special characters from strings in documents', () => {
      let text = 'Alice loves her ima&&gination';
      const expectedString = 'Alice loves her imagination';
      text = InvertedIndex.removeBadCharacters(text);
      expect(expectedString).toEqual(text);
    });
  });

  describe('The readFile method', () => {
    it('should return true if content was read from a valid JSON file', () => {
      expect(InvertedIndex.readFile('smallValidBook.json'))
        .toBeTruthy();
    });
  });

  describe('The UniqueWords method', () => {
    it('should ensure that a word is not repeated, for proper indexing', () => {
      let excerpt = ['alice', 'alice', 'be', 'called', 'loves', 'loves'];
      const expectedWords = ['alice', 'be', 'called', 'loves'];
      excerpt = InvertedIndex.uniqueWords(excerpt);
      expect(expectedWords).toEqual(excerpt);
    });
  });

  describe('The tokenizeText method', () => {
    it('should make all words lowercase', () => {
      let words = 'THE LORD OF THE RINGS';
      const expectedResult = ['lord', 'of', 'rings', 'the'];
      words = InvertedIndex.tokenizeText(words);
      expect(expectedResult).toEqual(words);
    });

    it('should ensure that sentences are splitted into an array of words'
      , () => {
        let excerpt = 'Alice in Wonderland';
        const expectedResult = ['alice', 'in', 'wonderland'];
        excerpt = InvertedIndex.tokenizeText(excerpt);
        expect(expectedResult).toEqual(excerpt);
      });

    it('should sort words alphabetically', () => {
      let excerpt = 'The Rings of the Lords';
      const expectedResult = ['lords', 'of', 'rings', 'the'];
      excerpt = InvertedIndex.tokenizeText(excerpt);
      expect(expectedResult).toEqual(excerpt);
    });
  });

  describe('The getIndex method', () => {
    it('should verify that index has been created', () => {
      expect(Object.keys(invertedIndex.getIndex('smallValidBook.json')).length)
        .toBeGreaterThan(0);
    });
  });

  describe('The searchIndex method', () => {
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
          'smallValidBook.json': {
            alice: [],
            and: [],
            her: [],
            imagination: [],
            unusual: [1] },
          'validBook2.json': {
            alice: [],
            and: [],
            her: [],
            imagination: [],
            unusual: [1] } };
        let term = {};
        term = invertedIndex.searchIndex('Alice, and her unusual imagination',
          'All');
        expect(term).toEqual(output);
      });
    });
  });
});

},{"../src/js/InvertedIndex.js":7,"./test/testFiles/emptyBook.json":2,"./test/testFiles/invalidBook.json":3,"./test/testFiles/malformedBook.json":4,"./test/testFiles/smallValidBook.json":5,"./test/testFiles/validBook2.json":6}],2:[function(require,module,exports){
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
    "title": "The Lords of the Rings",
    "text": "An unusual alliance of man."
  }
]
},{}],6:[function(require,module,exports){
module.exports=[
  {
    "title": "Baron in Freeland",
    "text": "Baron falls into a ditch."
  },

  {
    "title": "The Man of the House",
    "text": "An unusual alliance of family members."
  },
  {
    "title": "The Land of the Trees",
    "text": "An mysterous alliance of trees."
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
   * @returns {Object} response - JSON content of the read file
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
   * @param {Object} jsonContent - file content
   * @returns{Object} isValid - returns true and JSON content for valid files
   * and false for invalid files
   * @memberOf InvertedIndex
   */
  static validateFile(jsonContent) {
    let isValid = { status: false };
    const invalidStructureError = {
      name: 'validate file structure',
      message: 'File structure is invalid'
    };
    if (Object.keys(jsonContent).length === 0 &&
       typeof jsonContent === 'object') {
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
      if (error.name === 'validate file structure') return isValid;
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
   * @returns{String} term -
   *  a string of spaced words with no unwanted characters
   *
   * @memberOf InvertedIndex
   */
  static removeBadCharacters(text) {
    const invalid = /[.,/#!$%^&*;:{}=\-_`~()]/g;
    const term = text.replace(invalid, '');
    return term;
  }
  /**
   *
   *
   * @static
   * @param {String} document
   * @returns{Array} words - an array of unique words.
   *
   * @memberOf InvertedIndex
   */
  static tokenizeText(document) {
    let words = document.toLowerCase().split(' ').sort();
    words = InvertedIndex.uniqueWords(words);
    return words;
  }

  /**
   *
   *
   * @param {Array} validatedFileContent - contents of a valid JSON file
   * @param {String} fileName - name of the file
   * @returns{Object} this.indexedFiles -
   *  contains filenames title and indices of words in the file.
   *
   * @memberOf InvertedIndex
   */
  createIndex(validatedFileContent, fileName) {
    const indices = {};
    const documentWords = {};
    validatedFileContent.forEach((document, key) => {
      const concatenatedText = `${document.title} ${document.text}`;
      const text = InvertedIndex.removeBadCharacters(concatenatedText);
      documentWords[key] = InvertedIndex.tokenizeText(text);
    });
    Object.keys(documentWords).forEach((keys) => {
      documentWords[keys].forEach((word) => {
        if (!Object.prototype.hasOwnProperty.call(indices, word)) {
          indices[word] = [Number(keys)];
        } else { indices[word].push(Number(keys)); }
      });
    });
    this.indexedFiles[fileName] = indices;
    return this.indexedFiles;
  }

  /**
   *
   *
   * @param {String} fileName - the name of the JSON file
   * @returns{Object} this.indexedFiles -
   *  contains file title and indices of words in the file
   *
   * @memberOf InvertedIndex
   */
  getIndex(fileName) {
    return this.indexedFiles[fileName]; // Display a particular file
  }

  /**
   *
   *
   * @param {String} searchWords - the words being searched for
   * @param {String} nameOfFile
   * @returns{Object} this.searchIndices - the words and corresponding indices
   *
   * @memberOf InvertedIndex
   */
  searchIndex(searchWords, nameOfFile) {
    const searchOutput = {};
    if (typeof searchWords !== 'string') {
      return false;
    }
    searchWords = InvertedIndex.removeBadCharacters(searchWords);
    const tokenizedText = InvertedIndex.tokenizeText(searchWords);
    if (nameOfFile !== 'All') {
      const index = this.indexedFiles[nameOfFile];
      tokenizedText.forEach((word) => {
        if (index[word]) {
          searchOutput[word] = index[word];
        } else {
          searchOutput[word] = [];
        }
      });
      this.searchIndices[nameOfFile] = searchOutput;
    } else {
      const index = this.indexedFiles;
      Object.keys(index).forEach((fileName) => {
        const indexedFile = this.indexedFiles[fileName];
        tokenizedText.forEach((word) => {
          if (indexedFile[word]) {
            searchOutput[word] = indexedFile[word];
          } else {
            searchOutput[word] = [];
          }
        });
        this.searchIndices[fileName] = searchOutput;
      });
    }
    return this.searchIndices;
  }
}
module.exports.InvertedIndex = InvertedIndex;

},{}]},{},[1])