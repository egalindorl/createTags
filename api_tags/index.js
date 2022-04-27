const mysql = require('mysql2'), cors = require('cors'), express = require('express');
var url = require('url');
const querystring = require('querystring');
const { request } = require('http');

var app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lalo1704',
    database: 'tags'
});
connection.connect();

app.get('/tagNames', (req, res) => {
    connection.query('SELECT tag_name FROM `tags`.`tags`', function (err, results, fields) {
        if (err) {
            res.status(500).send('No se puede establecer conexion con base de datos');
        }
        else {
            res.send(results);
        }
    })
});

app.post('/postTag', function(request, response){
    let sql = 'INSERT INTO tags SET ?'

    let post = {
        tag_name : request.query.name
    }

    connection.query(sql, post, function (err, results) {
                if (err) {
                    response.status(500).send('No se puede establecer conexion con base de datos');
                }
                else {
                    response.send(['Succesfully installed into id: ' + results.insertId]);
                }
    })
});

app.delete('/deleteTag',function(request,response){
    let sql = 'DELETE FROM tags where tag_name = ?'
    
    connection.query(sql,request.query.name,function(err,results){
        if (err) {
            response.status(500).send('No se puede establecer conexion con base de datos');
        }
        else {
            response.send(['Succesfully installed into id: ' + results.insertId]);
        }
    })
}
)

const port = 3001;
const host = "0.0.0.0"
app.listen(port, host, () => console.log(`Listening on port ${port}...`));