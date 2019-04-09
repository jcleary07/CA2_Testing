// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})


function onError()
{
    console.log("An error occured");
}

//triggers cameraCallback and takes pic on phone
function pics(){
    navigator.camera.getPicture(cameraCallback, onError);
    }

function cameraCallback(imageData) {
    var image = document.getElementById("myImage");
    image.src= imageData;
    //triggers the file access request
    tryingFile();
    }

//requests access to local file system in perstistant state
function tryingFile(){

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}

//creates the file that needs to be created, in this case Test.jpg
function fileSystemCallback(fs){

    // Name of the file I want to create
    var fileToCreate = "Test.jpg";

    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };

//here the picture is added to the file in the for Blob but with a type image/jpeg
function getFileCallback(fileEntry){
    
    var dataObj = new Blob([cameraCallback.imageData], { type: 'image/jpeg' });
    console.log("success 1" + dataObj);
    // Now decide what to do
    // Write to the file
    writeFile(fileEntry, dataObj);

    // Or read the file
    readFile(fileEntry);
}

// Let's write some files
function writeFile(fileEntry, dataObj) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            console.log("SOMETHING WENT WRONG...");
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

    });
}

// Let's read some files
function readFile(fileEntry) {

    // Get the file from the file entry
    fileEntry.file(function (file) {
        console.log ("The file is called " + file.name);
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        
        reader.onloadend = function() {

            //var result = document.getElementById("myImage");
            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);
            //document.getElementById("myImage2").style.display='block';
            //document.getElementById("myImage2").src=evt.target.result;
            myImage2.src = this.result;
            
        };

        
        
    }, onError);
}

function onError(msg){
    console.log(msg);
}
