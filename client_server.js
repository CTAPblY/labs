var http = require("http");
var sqlite3 = require("sqlite3");
var fs = require("fs");
var db = require("./connection_dataBase.js");
const express = require("express");
const app = express();


app.get('/', function (request, response) {
    response.sendFile(__dirname + "/table.html");
});

app.listen(3000, function (){
    console.log("Server running at http://localhost:3000/");
});

app.get('/api/numbers', function(request, response){

    const search = request.query.search;
    var sql = `select * from numb where id="${search}"`;
    var params = [];
    db.all(sql, params, (err, rows) =>{
        if (err) {
            response.status(400).json({"error": err.message});
        }   
        response.json(rows);
    });
});


