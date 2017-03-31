class InvertedIndex {
  constructor() {
    this.searchIndices = {};
    this.indexedFiles = {};
  }

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

  validateFile(jsonContent) {
    let isValid = false;
    jsonContent.forEach((doc) => {
      if (doc.title && doc.text) {
        isValid = true;
      } else {
        isValid = false;
      }
      return isValid;
    });
    // return valid;
  }

  static unique(array) {
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

  static splitSort(docObject) {
    const words = docObject.toLowerCase().split(' ').sort();
    docObject = InvertedIndex.unique(words);
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
    console.log(book, 'book');
    book.forEach((doc, key) => {
      const joinedkeys = InvertedIndex.concatenateText(doc);
      const tokenizedWords = InvertedIndex.tokenizeWords(joinedkeys);
      splittedWords[key] = InvertedIndex.splitSort(tokenizedWords);
    });
    // index words
    Object.keys(splittedWords).forEach((keys) => {
      splittedWords[keys].forEach((words) => {
        if (!indices.hasOwnProperty(words)) {
          indices[words] = [keys];
        } else { indices[words].push(keys); }
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
    const sortedWords = InvertedIndex.splitSort(searchWords);
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


// let allFiles = [];
// const invertedIndex = new InvertedIndex();
// const fileInput = document.getElementById('fUpload');
// fileInput.addEventListener('change', () => {
//     //get files and validate extension
//     allFiles = [];
//     console.log(fileInput.files);
//     Object.keys(fileInput.files).forEach((file) => {
//         const eachFile = fileInput.files[file];
//         if (validateExt(eachFile.name)) {  //validate eachfile extention and push good files into allFiles
//             allFiles.push(eachFile);
//         } else {
//             console.log(eachFile.name+' is not valid');
//         }
//     });

// });


//     const readEachfile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//         try {
//            let result =event.target.result;
//             console.log(invertedIndex.tokenizeWords(result));
//             console.log(invertedIndex.createIndex(result));
//         } catch (err) {
//             console.log(err);
//         }
//     };
//     reader.readAsText(file);
// }

// const readFile = () => {
//     invertedIndex.readFile(allFiles);
// }


// let badExt = [];
// let goodExt = [];

// const validateExt = (name) => {
//     if (!name.toLowerCase().match(/\.json$/)){
//         badExt.push(name);
//         console.log(badExt);
//         return false;
//     } else {
//         goodExt.push(name);
//         console.log(goodExt);
//         return true;
//     };
// }
