const app = angular.module('angular', []);
app.controller('index', ['$scope', 'alertFactory', ($scope, alertFactory) => {
  $scope.message = "About this application!/n Users should be able to click an 'Upload File' to upload book files" +
      'Allow multiple uploads' +
      "Users should be able to click a 'Create Index' button to create an Inverted for uploaded files" +
      'Users should be able to search through files that have been indexed' +
      'Allow Users search through selected files' +
      'Allow Users search through all indexed files';

  $scope.result = 'not done yet';
  $scope.content = {};
  $scope.filename = [];
    // $scope.allFiles;
    // let allFiles = [];

  const invertedIndex = new InvertedIndex();

  // function to read content from each file and validate JSON content structur
  $scope.validateFiles = () => {
    // let allFiles = [];
    const badExt = [];
    const goodExt = [];
    const fileInput = document.getElementById('fUpload');
    // console.log(fileInput.files);
    Object.keys(fileInput.files).forEach((file, index) => {
      const eachFile = fileInput.files[file];
      if (!eachFile.name.toLowerCase().match(/\.json$/)) {
        badExt.push(eachFile.name);
      } else {
        goodExt.push(eachFile.name);
        invertedIndex.readFile(eachFile).then((response) => {
          console.log(response,'response');
          if (invertedIndex.validateFile(response)){
          $scope.content[eachFile.name] = response;
        }
        else{
          console.log('bad file');
        }
          // $scope.filename.push(eachFile.name);
        }).catch((error) => {
          console.log(error);
        });
      }
    });
    // $scope.allFiles = eachFile;
    badExt.forEach((ext) => {
      alertFactory.error(`Bad Extension: ${ext}`);
    });
    goodExt.forEach((ext) => {
      alertFactory.success(`Good Extension(s): ${ext}`);
    });
  };

  $scope.createBookIndex = () => {
    // console.log($scope.content);
    // return;
    //const filenames = Object.keys($scope.content);
    Object.keys($scope.content).forEach((file) => {
      if (invertedIndex.validateFile($scope.content[file].index)) {
        try {
          console.log($scope.filename, 'scope.filename');
          $scope.fileIndices = invertedIndex.createIndex(file, $scope.filename);
        } catch (err) {
          console.log(err);
        }
        return $scope.fileIndices;
      }
      return 'Your file is not in the right structure';
    });
  };

  $scope.searchBookIndex = () => {
    let searchFeedback = {};
    const searchInput = document.getElementById('search');
    const searchBook = document.getElementById('bookList');
    console.log(searchInput, 'searchInput', searchBook, 'searchBook');

    if (searchInput === undefined && searchBook !== undefined) {
      searchFeedback = invertedIndex.getIndex(searchBook);
    } else if (searchInput !== undefined && searchBook !== undefined) {
      try {
        searchFeedback = invertedIndex.searchIndex(searchInput, searchBook);
      } catch (err) {
        console.log(err);
      }
    } else { return 'Please select a file to search for words'; }
    return searchFeedback;
  };
}]);

app.factory('alertFactory', () => ({
  success: (text) => {
    toastr.success(text, 'Success');
  },
  error: (text) => {
    toastr.error(text, 'Error');
  }
}));
