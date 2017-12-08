// Created by Hugang Yu on Dec/07/2017

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'db550hugang.c82xzguu2hvf.us-east-2.rds.amazonaws.com',
    user: 'db550hugang',
    password: 'db550password',
    database: 'db550',
    port: '3306'
});

var checkComment = function(name, res){
    var query = 'select distinct r.name as nearbyRestaurant, r.address, r.postal_code from yelp_db.business r, db550.Hotel h where r.postal_code = h.Zip and h.Name = "' + name + '"';
    connection.query(query, function(err, rows, fields) {
                     if (err) console.log(err);
                     else {
                     console.log(rows);
                     res.json(rows);
                     }
                     });
}

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

module.exports = {
    nearByRest,
    qCityHotel
};
