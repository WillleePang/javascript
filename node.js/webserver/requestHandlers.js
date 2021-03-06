/*
* @Author: hq
* @Date:   2018-02-07 17:45:59
* @Last Modified by:   hq
* @Last Modified time: 2018-02-07 18:26:58
*/


var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");


function start(response,request){
	console.log("Request handler 'start' was called.");

 	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response,request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	var filepath = "C:/Users/hq/Desktop/sss.png"
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		fs.renameSync(files.upload.path, filepath);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response,request) {
  console.log("Request handler 'show' was called.");
  var filepath = "C:/Users/hq/Desktop/sss.png"
  fs.readFile(filepath, "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}


exports.start = start;
exports.upload = upload;
exports.show = show;
