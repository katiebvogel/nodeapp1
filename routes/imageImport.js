var express = require('express');
var router = express.Router();

var fs = require('file-system');
var Top = require('./index.js');
var async = require('async');
var path = require('path');
var request = require('request');



/////////////////////////////////
//~~~~~~~~~~~~~~~~~~~~~~~BEGIN Block of code for importing IMAGES and transforming to Reaction Schema    BEGIN   ~~~~~~~~~~~~~~~~~~~~~

// request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))

var jpeg = require('jpeg-js');

var pictureID = 23543;
var imageUrl = 'https://static.evereve.com/prodimages/' + pictureID + '-DEFAULT-l.jpg';



const https = require("https");
const file = fs.createWriteStream("file.docx");
//

// function addimage() {
//     var img = request.get("https://static.evereve.com/prodimages/23543-DEFAULT-l.jpg");
//     console.log('image', img);
//     var decoded = jpeg.decode(img);
//     console.log('decoded image?', decoded );
// }
//
// addimage();

// 
// request.get("", function(response){
//            console.log('reseponse data:', response);
//           //  var str = _arrayBufferToBase64(response.data);
//           //  console.log('here is a string?', str);
//           return response;
//          });




//
// String newFileName = "my-image";
//   File imageFile = new File("/users/victor/images/image.png");
//   GridFS gfsPhoto = new GridFS(db, "photo");
//   GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
//   gfsFile.setFilename(newFileName);
//   gfsFile.save();

// request(imageUrl).pipe(fs.createWriteStream('image.jpg'));


https.get("https://static.evereve.com/prodimages/23543-DEFAULT-l.jpg", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('url is here:', imageUrl);
        // var image = body;
        var rawImageData = jpeg.decode(body);
        console.log('jpegData: ', body.data);
    }
});



// var pictureID = 23543;
// var imageUrl = 'https://static.evereve.com/prodimages/' + pictureID + '-DEFAULT-l.jpg';
//
//


// request.get('/uploads/fullsize/:file', function (req, res){
//   file = req.params.file;
//   var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
//   res.writeHead(200, {'Content-Type': 'image/jpg' });
//   res.end(img, 'binary');
//
// });
