//SERVER SIDE

var express = require('express');
var app = express();
var path = require("path");
var mysql = require('mysql');
var builder = require('xmlbuilder');
var fs = require('fs');

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

// create xml file from PK entered by user
function make_xml_file(address)
{
    var xml = builder.create('coinBook');
    xml.ele('coin')
        .ele('coinName', "Some_coin").up()
        .ele('coinBalance', '52').up()
        .up()
    .end();


    var doc = xml.toString({pretty: true});
    fs.writeFile('C:\\temp\\test.xml', doc, function(err){
        if(err)
        {
            return console.log(err);
        }
        console.log("saved xml");
    });
}

// activate HTML page
app.get("/", function(req, res){  // the main page
    res.sendFile(path.join(__dirname, "public\\HTML", "MainPage.html"));
});

// send xml to frontend
app.get("/EXMPLExml.xml", function(req, res){  // sending the xml file as response for the xml request
    res.contentType('application/xml');
    res.sendFile(path.join(__dirname, "public\\HTML", "EXMPLExml.xml"));   
});

// connect to DB
read_from_DB("lior");
app.listen(80);
