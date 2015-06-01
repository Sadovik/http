var http = require('http');
var url = require('url');
//var querystring = require('querystring');
var module_FS = require('./src');

var server = new http.Server(function(req, res){
    //console.log(req.method, req.url);

    var urlParsed = url.parse(req.url, true);
    //console.log(urlParsed);

    if (urlParsed.pathname == '/echo' && urlParsed.query.method) {
        res.end('Method: ' + urlParsed.query.method + '\nFilename: ' + urlParsed.query.filename );
        var arrComand =  { filename: urlParsed.query.filename, method: urlParsed.query.method };
        console.log(arrComand);

        var comand = new module_FS(arrComand);
        if ( urlParsed.query.method == "Copy") {
            comand.Copy();
        } else if (urlParsed.query.method == "Del") {
            comand.Del();
        }
    } else if (urlParsed.pathname == '/') {
        res.end("All *.txt files shown in console.");
        var arrComand =  '/';
        var comand = new module_FS(arrComand);
        comand.In();
    } else {
        res.statusCode = 404;
        res.end("Page not found")
    }
});

server.listen(3000,'127.0.0.1');
