const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./node_db.db', (err) => {
    if (err){
        console.error(err.message);
    }   
    console.log("Connected to the node_db ");   
});

db.close();


