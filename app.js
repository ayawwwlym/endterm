var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var PackagePath = '.' + request.url;

    switch (PackagePath){
        case './':
        PackagePath = './index.html';
        break;

        case './about': 
        PackagePath = './about.html';
        break;

        case './img/gallery/graduation': 
        PackagePath = './img/gallery/graduation.jpg';
        break;

        case'./img/gallery/study': 
        PackagePath = './img/gallery/study.jpg';
        break;

        case'./video/memes':
        PackagePath = './video/students/memes.mp4';
        break;

    }

    var extname = String(path.extname(PackagePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.png': 'image/png',
        '.js': 'text/javascript',
        '.jpg': 'image/jpg',
        '.mp4': 'video/mp4',
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(PackagePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./error.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Internal error with a response code 500: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(1337);
console.log('Server starting at http://127.0.0.1:1337/'); 
