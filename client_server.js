var http = require("http");
var sqlite3 = require("sqlite3");
let db;
db = new sqlite3.Database('./node_db.db');
var fs = require("fs");

http.createServer(function (request, response) {
    fs.readFile('db_table.html', async function(err, data){
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(data);
        function getNumber() {
            return new Promise((resolve, reject) => {          
                let sql = `SELECT * FROM NUMB ORDER BY id`;   
                return db.all(sql, [], function (err, rows) { 
                    var list  = [];
                    if (err) {
                    console.error(err.message);
                    return reject(err.message);
                    }
                    
                    rows.forEach((row) => {
                        list.push(row);
                    });
                    return resolve(list);
                });
            });
        }

        var result = await getNumber();
        for (var i = 0; i < result.length; i++){
            if (i % 2 != 0){
                response.write('<div class="row border border-dark">\n');
            }   else { response.write('<div class="row border border-dark bg-info">\n'); }
            response.write('<div class="col border border-dark">' + `${result[i].id}` + '</div>\n');
            response.write('<div class="col border border-dark">' + `${result[i].numb}` + '</div>\n');
            response.write('<div class="col border border-dark">' + `${result[i].country}` + '</div>\n');
            response.write('</div>\n');
        }
            
        response.end('</div>\n' + '</body>\n'  + '</html>\n');
    });
}).listen(3000);
console.log("Server running at http://localhost:3000/");



