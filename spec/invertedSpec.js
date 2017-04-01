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
      const words = 'Alice falls into alliance';
      expect(Object.keys(invertedIndex.searchIndex(words, 'smallValidBook.json'))).toBeTruthy();
    });
    it('should check that index maps the string to the correct objects in json'
     + ' array', () => {
      const expectedIndices =  { alice: [ 0 ], alliance: [ 1, 2 ], falls: [ 0 ], into: [ 0 ] };
      let result = {};
      result = invertedIndex.getIndex('smallValidBook.json');
      expect(Object.keys(result)).toEqual(Object.keys(expectedIndex));
      expect(values(result)).toEqual(values(expectedIndex));
    });
  });
});



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

