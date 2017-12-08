// Created by Hugang Yu on Dec/07/2017

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'db550hugang.c82xzguu2hvf.us-east-2.rds.amazonaws.com',
    user: 'db550hugang',
    password: 'db550password',
    database: 'db550',
    port: '3306'
});


var MongoClient = require('mongodb').MongoClient;
var uri = 'mongodb://CIS550Project:CIS550ProjectPassword@yelpcomments-shard-00-00-r2vwc.mongodb.net:27017,yelpcomments-shard-00-01-r2vwc.mongodb.net:27017,yelpcomments-shard-00-02-r2vwc.mongodb.net:27017/test?ssl=true&replicaSet=YelpComments-shard-0&authSource=admin';


var nearByRest = function(name, res){
    var query = 'select distinct r.name as nearbyRestaurant, r.address, r.postal_code from yelp_db.business r, db550.Hotel h where r.postal_code = h.Zip and h.Name = "' + name + '"';
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log(rows);
            res.json(rows);
        }
    });
}

var qCityHotel = function(name, res){
    var query = 'select h.Name, h.Zip, h.Address from db550.Hotel h where h.City = "' + name + '"';
    console.log("Querying qCity: " + query);
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log("qCityHotel" + rows);
            res.json(rows);
        }
    });
}

var qComment = function(name, res){
  var id = '';
  var query = 'select r.id from yelp_db.business r where r.name = "' + name + '"';
  connection.query(query, function(err, rows, fields) {
      if (err) console.log(err);
      else {
          console.log(rows);
          id= rows.id;
      }
  });

  MongoClient.connect(uri, function(err, db) {
    // console.log(db);

    var ndb = db.db('test');
    console.log('connedted!');
    var pro = ndb.collection('comments').find({business_id:id});
    setTimeout( () => {
      console.log('Printing results: ');
      // // console.log(result);
      // pro.forEach(function(val){
      //   cmts.push(val);
      //   console.log(val);
      // });
      var temp = pro.next();
      console.log(temp);
      res.json(temp);
    }, 10000);
    console.log('ended!');
  });
}


module.exports = {
    nearByRest,
    qCityHotel,
    qComment
};
