var express = require('express');
var app = express();
var path = require("path");
var mysql = require('mysql');

app.use(express.static(path.join(__dirname, "public")));

function read_from_DB(address)
{
    var con = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Sql123456',
        database: 'coinsschema'
        
    });
    con.connect(function(err){
        if(err) throw err;
    });
    var sql = "SELECT * FROM balances WHERE address = " + mysql.escape(address); // prevent sql injection
    con.query(sql, function(err, result, fields){
        if (err) throw err;
        console.log(result);
        return result;
    });
}



app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "MainPage.html"));
})

read_from_DB("Lior");
app.listen(80);



document.getElementsByClassName("tablink")[0].click();





