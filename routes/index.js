var express = require('express');
var router = express.Router();
var ObjectId=require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Animes';

var collection1 = [];
var collection2 = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  	

	MongoClient.connect(url, function(err,db) {
	  	console.log("Connected");

		db.collection('animes').find().toArray((err, result) =>{
				for (i=0; i<result.length; i++) {
		            collection1[i] = result[i];
		        }
		});

		db.collection('mangas').find().toArray((err, result) =>{
				for (i=0; i<result.length; i++) {
		            collection2[i] = result[i];
		        }
			}); 
	res.render("index",{animes: collection1,mangas: collection2});
	});
});

router.get('/editar/anime/:id',function(req, res, next){

	MongoClient.connect(url, function(err,db) {
		var objId = new ObjectId(req.params.id);
		console.log(objId);
		var query = { "_id": objId};

 		db.collection("animes").find(query).toArray(function(err, result) {
 			
			res.render("editarAnime",{objeto: result});
		});

		
	});
});

router.get('/editar/manga/:id',function(req, res, next){

	MongoClient.connect(url, function(err,db) {
		var objId = new ObjectId(req.params.id);

		var query = { "_id": objId};

 		db.collection("mangas").find(query).toArray(function(err, result) {
			res.render("editarManga",{objeto: result});
		});

		
	});
});

router.get('/editar/anime/editarNuevo',function(req,res,next){
	console.log(req.body);
});

router.get('/update',function(req,res,next){
	console.log(req.body);
});

module.exports = router;
