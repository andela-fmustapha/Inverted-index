angular.module('angular', [])
  .controller('index', ['$scope', function ($scope) {
    $scope.message = "About this application!/n Users should be able to click an 'Upload File' to upload book files" +
      'Allow multiple uploads' +
      "Users should be able to click a 'Create Index' button to create an Inverted for uploaded files" +
      'Users should be able to search through files that have been indexed' +
      'Allow Users search through selected files' +
      'Allow Users search through all indexed files';

    $scope.result = 'not done yet';
    // $scope.allFiles;
    // let allFiles = [];

    const invertedIndex = new InvertedIndex();

    // function to read content from each file and validate JSON content structure
    const readGoodFiles = (aFiles) => {
      
    };

    // function to validate file extensions
    
    const validateExt = (name) => {
      
    };
  

 $scope.validateFiles = () => {
      const allFiles = [];
      const badExt = [];
      const goodExt = [];
       
      const fileInput = document.getElementById('fUpload');
      //console.log(fileInput, 'fileInput=========');
      console.log(fileInput.files, 'fileInput.files');
      Object.keys(fileInput.files).forEach((file) => {
        const eachFile = fileInput.files[file];
      if (!eachFile.name.toLowerCase().match(/\.json$/)) {
          badExt.push(eachFile.name);
          console.log(badExt);
          return false;
       }
          goodExt.push(eachFile.name);
          console.log(goodExt);
          //return true;
          allFiles= goodExt;
          $scope.allFiles = allFiles;
          $scope.content = invertedIndex.readFile(allFiles);
          console.log($scope.content, 'FileContent');
          return $scope.content;
        } else {
          console.log(`${eachFile.name} is not valid`);
        }
      });
    };


$scope.createBookIndex = () => {
      console.log($scope.content, 'Content of each file');
      $scope.content.forEach((file) => {
          // const fileContent =readGoodFiles($scope.allFiles);
        try {
            // const validatedContent = invertedIndex.validateFile($scope.content);
            console.log($scope.filename, 'scope.filename');
            $scope.fileIndices = invertedIndex.createIndex(file, $scope.filename);
          }
        catch (err) {
          console.log(err);
        }
        return $scope.fileIndices;
      });
};
  }]);

  $scope.searchBookIndex =() =>{
    const searchFeedback ={};
    const searchInput = document.getElementById('search');
    const searchBook = document.getElementById('bookList');
    console.log(searchInput,'searchInput',searchBook,'searchBook');
    
    if (searchInput === undefined && searchBook !== undefined){
      searchFeedback = invertedIndex.getIndex(searchBook);
    }
    else if (searchInput !== undefined && searchBook !== undefined){
    try{
      searchFeedback = invertedIndex.searchIndex(searchInput,searchBook);
  }
    catch(err){
    console.log(err);
  }
    }
    else
    return 'Please select a file to search for words';
    return searchFeedback;
  }

  
// call read files from validate FileExt and validate the other aspects of the JSON Object
// then attach event handler to




    // const readFile = () => {
    //     invertedIndex.readFile(allFiles);
    // }


    // validate file extensions

