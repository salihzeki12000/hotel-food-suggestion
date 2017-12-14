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

var qCityHighestHotel = function(city, res){
    var query = 'Select H2.name as name, H2.Address as address, convert(averageStar, DECIMAL(5,2)) as averageStar\n' +
        'From (Select H.EANHotelID, H.Address, H.name, R.id, avg(R.stars) as averageStar\n' +
        '\tFrom db550.Hotel H, yelp_db.business R\n' +
        '\tWhere H.Zip =  R.postal_code and  H.city = "'+ city +'"\n' +
        '\tGroup by H.EANHotelID\n' +
        ') as H2\n' +
        'order by averageStar DESC\n' +
        'limit 10;\n'
    connection.query(query, function(err, rows, fields) {
        if (err) console.log(err);
        else {
            console.log("qCityHighestHotel result:" + rows);
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
          id= rows[0].id;
          console.log(id);
      }
  });




  MongoClient.connect(uri, function(err, db) {
    // console.log(db);

    var ndb = db.db('test');
    console.log('connedted!');
    var pro = ndb.collection('comments').find({business_id:id});
    //ndb.collection('comments').find({business_id:id}).toArray(function(err, res){

    // });
    var temp = pro.next();
    setTimeout( () => {
      console.log('Printing results: ');
      // // console.log(result);
      // pro.forEach(function(val){
      //   cmts.push(val);
      //   console.log(val);
      // });
      pro.toArray(function(err, result){
        if (err) throw err;
        console.log(result.length);
        res.json(result);
      });
      // res.json(temp);
    }, 10000);
    console.log('ended!');
  });
}


module.exports = {
    nearByRest,
    qCityHotel,
    qComment,
    qCityHighestHotel
};
