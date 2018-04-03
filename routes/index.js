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
	db.close();
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

		db.close();
	});
});

router.get('/editar/manga/:id',function(req, res, next){

	MongoClient.connect(url, function(err,db) {
		var objId = new ObjectId(req.params.id);

		var query = { "_id": objId};

 		db.collection("mangas").find(query).toArray(function(err, result) {
			res.render("editarManga",{objeto: result});
		});

		db.close();
	});
});

router.post('/editar/anime/update',function(req,res,next){
	var id = req.body['id'];

	var myquery = { "_id": ObjectId(id)};


	MongoClient.connect(url, function(err,db) {
		var dbo = db.db("Animes");
		db.collection("animes").find(myquery).toArray(function(err, result) {
	 		var newTitulo = req.body['titulo'];
	 		var newEstudio =req.body['estudio'];
		    var newAño = req.body['año'];
	     	var newvalues = { $set: {titulo: newTitulo,estudio: newEstudio, año: newAño} };
			dbo.collection("animes").updateMany(myquery, newvalues, function(err,res){
				if (err) throw err;
				console.log("modificado!")
				db.close();
			
			});
			
		});

	});

	res.redirect("/");

});

router.post('/editar/manga/update',function(req,res,next){
	var id = req.body['id'];

	var myquery = { "_id": ObjectId(id)};


	MongoClient.connect(url, function(err,db) {
		var dbo = db.db("Animes");
		db.collection("mangas").find(myquery).toArray(function(err, result) {
	 		var newTitulo = req.body['titulo'];
	 		var newAutor =req.body['autor'];
		    var newAño = req.body['año'];
	     	var newvalues = { $set: {titulo: newTitulo, autor: newAutor, año: newAño} };
			dbo.collection("mangas").updateMany(myquery, newvalues, function(err,res){
				if (err) throw err;
				console.log("modificado!")
				db.close();
			
			});
			
		});

	});

	res.redirect("/");
});

module.exports = router;
