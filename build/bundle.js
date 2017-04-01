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

  // describe('Search index', () => {
  //   it('should return true if search term is a string', () => {
  //     const words = 'Alice loves her ima&&gination'
  //     expect(Object.keys(invertedIndex.searchIndex('words', 'validbook.json'))).toBeTruthy();
  //   });
  // });
});

//     it('should check that index maps the string to the correct objects in json'
//      + ' array', () => {
//       const expectedIndices = {
//         and: [0, 1],
//         barbie: [1],
//         cindarella: [1],
//         cindy: [1],
//         dearie: [0],
//         going: [0],
//         hello: [0],
//         'how\'s': [0],
//         i: [0, 1],
//         it: [0],
//         love: [0, 1],
//         you: [0]
//       };
//       let result = {};
//       result = invertedIndex.getIndex('secondBook.json');
//       expect(Object.keys(result)).toEqual(Object.keys(expectedIndex));
//       expect(values(result)).toEqual(values(expectedIndex));
//     });
//   });



//     it('should return false if search term is not a string', () => {
//       const newWords = ['I love Barbie and Alice'];
//       expect(Object.keys(invertedIndex.searchIndex('newWords', 'secondBook.json'))).toBeTruthy();
//     });

//     it('should return true if search term is a number', () => {
//       const number = 1234;
//       expect(Object.keys(invertedIndex.searchIndex('number', 'secondBook.json'))).toBeTruthy();
//     });

//     it('should search through single files that are indexed', () => {
//       const expectedResult = {
//         'secondBook.json':
//         {
//           barbie: [1],
//           and: [0, 1],
//           cindarella: [1],
//           dearie: [0]
//         }
//       };
//       let search = {};
//       search = invertedIndex.searchIndex('barbie, mercy and cindarella dearie',
//       'secondBook.json');
//       expect(Object.keys(search)).toEqual(Object.keys(expectedResult));
//       expect(values(expectedResult)).toEqual(values(expectedResult));
//     });

//     it('should search through all files', () => {
//       const allFiles =
//       {
//         'validBook.json':
//         {
//           alice: [0],
//           an: [1],
//           barbie: [2],
//           cartoons: [2],
//           of: [0, 1],
//           unusual: [1],
//           wizard: [1]
//         },
//         'secondBook.json':
//         {
//           barbie: [ 1 ]
//         }
//       }

//       let search = {};
//       search = invertedIndex.searchIndex('Barbie loves cartoons but she\'s scared of an unusual wizard, alice fall\'s',
//       'All files');
//       expect(Object.keys(search)).toEqual(Object.keys(allFiles));
//       expect(values(allFiles)).toEqual(values(allFiles));
//     });
//    });
//  });

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
class InvertedIndex {
  constructor() {
    this.searchIndices = {};
    this.indexedFiles = {};
    this.allTitles = {};
  }

  readFile(eachFile) {
    const filename = eachFile.name;
    let fileContent;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(eachFile);
      reader.onload = ((event) => {
        try {
          fileContent = JSON.parse(event.target.result);
          if (this.validateFile(fileContent)) {
            resolve(fileContent);
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  /**
   * 
   * 
   * @static
   * @param {any} jsonContent 
   * @returns 
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

  static uniqueWords(array) {
    if (Array.isArray(array)) {
      const checked = {};
      return array.filter((item) => {
        if (!checked[item]) {
          checked[item] = true;
          return item;
        }
        return null;
      });
    }
    return ['invalid data type supplied'];
  }

  static tokenizeWords(text) {
    const invalid = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
    text = text.replace(invalid, '');
    return text;
  }

  static splitAndSort(docObject) {
    const words = docObject.toLowerCase().split(' ').sort();
    docObject = InvertedIndex.uniqueWords(words);
    return docObject;
  }

  static concatenateText(jContent) {
    // if a document exists? combine title and text to split at once
    let concatenatedText = {};
    concatenatedText = `${jContent.title} ${jContent.text}`;
    return concatenatedText;
  }

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

  getIndex(filename) {
    return this.indexedFiles[filename]; // Display a particular file
  }

  searchIndex(searchWords, fileName) {
    const searchResult = {};
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
        searchResult[word] = index[word];
      } else {
        searchResult[word] = [];
      }
    });
    return searchResult;
  }
}

module.exports.InvertedIndex = InvertedIndex;

},{}]},{},[1])