//SERVER SIDE

var express = require('express');
var app = express();
var path = require("path");
var mysql = require('mysql');
var builder = require('xmlbuilder');
var fs = require('fs');
var q = require('q');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded());

function read_from_DB(address)
/**
 * input: string - address of the public key
 * output: None 
 * this function sends sql query to the DB and retrun all the coins balances of the input address
 * note that this function is async function so you cant call like regular function
 */
{
    var deffered = q.defer();
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
        deffered.resolve(result);
        con.destroy();
    });
    return deffered.promise;
}

// create xml file from PK entered by user
async function make_xml_file(address)
/**
 * input: string - address of the public key
 * output: None
 * this function creates the xml file based on the input address and saves the file on the server side
 * note that this function is async function you cant call like regular function
 */
{
    var deffered = q.defer();
    var balance;
    await read_from_DB(address).then(function(result){ // will wait unti the async function return
        balance = result[0];
    });

    if(!balance)
    {

    }
    var xml = builder.create('COINS');
    try{

        xml.ele('COIN')
            .ele('CoinName', "BITCOIN CORE").up()
            .ele('CoinBalance', balance.core_balance).up().up()
            .ele('COIN')
            .ele('CoinName', "BITCOIN CASH").up()
            .ele('CoinBalance', balance.cash_balance).up().up()
            .ele('COIN')
            .ele('CoinName', "BITCOIN DIAMOND").up()
            .ele('CoinBalance', balance.diamond_balance).up().up()
    }
    catch(err) // will raise error if the DB returned empty 
    {
        console.log(err)
    }
    xml.end();
        
    var doc = xml.toString({pretty: true});
    fs.writeFile(path.join(__dirname, "public\\HTML", "balances.xml"), doc, function(err){
        if(err)
        {
            return console.log(err);
        }
        console.log("saved xml");
        deffered.resolve();
    });
    return deffered.promise;
}

// activate HTML page
app.get("/", function(req, res){  // the main page
    /**
     * input: http request of th main page
     * ouput: html file and css files
     * this will handle the http request of the main page
     */
    res.sendFile(path.join(__dirname, "public\\HTML", "MainPage.html"));
});

// send xml to frontend
app.post("/balances.xml", async function(req, res){ 
    /**
     * input: http request for the xml file
     * output: xml file
     * this will handle the http request for the xml file
     */
    var address = req.body.public_key;
    await make_xml_file(address).then(function(){ // will block until xml is ready
        res.contentType('application/xml');
        res.sendFile(path.join(__dirname, "public\\HTML", "balances.xml"));   
    });
});

app.listen(80);
