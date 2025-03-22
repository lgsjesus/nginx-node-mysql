const  express = require('express');
const  app = express();
const  port = 3000;
const config ={
    host:'db',
    user:'root',
    password:'root',
    database:'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);
let pessoas = [];
const sqlExists = `SELECT * FROM information_schema.tables WHERE table_schema = 'nodedb' AND table_name = 'people'`;
connection.query(sqlExists, function (err, result) {
    if (err) throw err;
    if (result.length === 0) {
        const sqlCreate = `CREATE TABLE people (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id))`;
        connection.query(sqlCreate);
        
    }
    const sql = `INSERT INTO people(name) values('Maria')`;
    connection.query(sql);
    const sqlSelect = `SELECT name FROM people`;
    connection.query(sqlSelect, function (err, result) {
        if (err) throw err;
        pessoas = result;
    });
    connection.end();
});


app.get('/', (req, res) => {
    const peopleHtml = pessoas.map(p => `<p>${p.name}</p>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1> <br/> Total: ${pessoas.length} <br/> ${peopleHtml}`);
});



app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });