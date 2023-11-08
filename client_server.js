var http = require("http");
var fs = require("fs");
http.createServer(function (request, response) {
    fs.readFile('table.html', function(err, data){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(data);
        response.end();
    });
}).listen(3000);
console.log("Server running at http://localhost:3000/");
