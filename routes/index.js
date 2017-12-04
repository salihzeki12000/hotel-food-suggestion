var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'db550hugang.c82xzguu2hvf.us-east-2.rds.amazonaws.com',
	user: 'db550hugang',
	password: 'db550password',
  database: 'db550',
  port: '3306'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/reference', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

router.get('/insert', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'insert.html'));
});

router.get('/family', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'family.html'));
});

router.get('/data/:email', function(req,res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log("inside person email");
    var email = req.params.email;
    // var query2 = 'SELECT p.*, COUNT(f.friend) as num ' +
    //   'FROM Person p LEFT JOIN Friends f ' +
    //   'ON p.login = f.login ';
    // if (email != 'undefined' && email != ' ') query2 = query2 + 'WHERE p.login ="' + email + '"' ;
    //   query2 = query2 + ' GROUP BY p.login';
  var query2 = 'select * from Hotel';
  console.log(query2);
  connection.query(query2, function(err, rows, fields) {
    if (err) console.log(err);
    else {
        res.json(rows);
    }
    });
});

router.get('/data/', function(req, res)
{
    var query2 = 'SELECT p.*, COUNT(f.friend) as num ' +
        'FROM Person p LEFT JOIN Friends f ' +
        'ON p.login = f.login ';
    query2 = query2 + ' GROUP BY p.login';

    console.log(query2);
    connection.query(query2, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            res.json(rows);
        }
    });
});

// ----Your implemention of route handler for "Insert a new record" should go here-----

router.get('/data/login/:login/name/:name/sex/:sex/RelationshipStatus/:RelationshipStatus/Birthyear/:Birthyear',
    function(req,res) {
  var login = req.params.login;
  var name = req.params.name;
  var sex = req.params.sex;
  var relation = req.params.RelationshipStatus;
  var birthyear = req.params.Birthyear;

  var query = "INSERT INTO Person VALUES('"+login+"', '"+name+"', '"+sex+"', '"+relation+"', "+birthyear+");"

  console.log(login+' '+name+' '+sex+' '+relation+' '+birthyear);
  connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
  });
})

router.get('/person/:name',
    function(req,res) {
        var name = req.params.name;
        console.log("family name = " + name);

        var query = 'SELECT p.*, f.role as role ' +
            'FROM Person p JOIN Family f ' +
            'ON p.login = f.member ' +
            'WHERE f.login = "' + name + '"';
        connection.query(query, function(err, rows, fields) {
            if (err) console.log(err);
            else {
                res.json(rows);
            }
        });
    })

router.get('/personDropDown',
    function(req,res) {

        console.log("Drop down menu hit");

        var query = 'SELECT DISTINCT f.login ' +
            'FROM Family f ';
        connection.query(query, function(err, rows, fields) {
            if (err) console.log(err);
            else {
                console.log(rows);
                res.json(rows);
            }
        });
    })

module.exports = router;
