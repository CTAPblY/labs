var http = require("http");
var sqlite3 = require("sqlite3");

let db;
db = new sqlite3.Database('./node_db.db');
let number = 0;
var list  = [];


http.createServer(async function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    response.write("<!DOCTYPE html>\n" +
                    "<html>\n" +
                    " <head>\n" +
                    " <meta charset='utf-8'>\n" +
                    " </head>\n" +
                    " <body>\n"
                );

    function getNumber() {
        return new Promise((resolve, reject) => {          
        let sql = `SELECT * FROM NUMB ORDER BY id`;   
        return db.all(sql, [], function (err, rows) { 
            if (err) {
            console.error(err.message);
            return reject(err.message);
            }
    
            rows.forEach((row) => {
                list[row.id] = `${row.id}  ${row.numb}  ${row.country}`;
            });
            return resolve(list);
        });
        });
    }

    let result = await getNumber();
    response.write(`${result}`);
    response.end(
                " </body>\n" +
                "</html>\n"
                );
}).listen(3000);
console.log("Server running at http://localhost:3000/");

