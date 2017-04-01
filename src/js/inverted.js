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
