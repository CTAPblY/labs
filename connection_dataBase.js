var sqlite3 = require("sqlite3");

let db = new sqlite3.Database('./node_db.db', (err) => {
    if (err) {
        console.error(err.message);
    }   else {
        console.log("Connected successfully");
    }
});

module.exports = db;