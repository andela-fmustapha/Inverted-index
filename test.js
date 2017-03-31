 readFile( aFiles ) {
   console.log( aFiles, 'aFiles' );
   aFiles.forEach( ( file ) => {
     // console.log(file, "file one");
     readEachfile( file );
   } );
 }

 validateFile( jsonContent ) {
   jsonContent.forEach( ( doc ) => {
     if ( doc.hasOwnProperty( 'title' ) && doc.hasOwnProperty( 'text' ) ) {
       // console.log(doc.title + 'is invalid');
       return true;
     }
     // console.log('validated');
     return false;
   } );
 }

 static unique( array ) {
   if ( Array.isArray( array ) ) {
     const checked = {};
     return array.filter( ( item ) => {
       if ( !checked[ item ] ) {
         checked[ item ] = true;
         return item;
       }
       return null;
     } );
   }
   return [ 'invalid data type supplied' ];
 }

 static tokenizeWords( text ) {
   const invalid = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
   text = text.replace( invali should be d, '' );
   return text;
 }

 static splitSort( doc
