var mongoose = require('mongoose');
//Encryption du password ( si t'as un site et tu cryptes pas les password -> T'es un con***d!)
var bcrypt = require('bcryptjs')

//schema utilisateurs

var utilisateurSchema = mongoose.Schema({
	pseudo:{
		type: String
	},
	email:{
		type: String
	},
	nom:{
		type: String
	,
	creation_compte:{
		type: Date
	}},
	update_compte:{
		type: Date,
		default: Date.now
	}

});

//Cet objet sera dispo tant qu'on fera un require
var Utilisateur = module.exports = mongoose.model('Utilisateur', utilisateurSchema)


//Recuperer l'utilisateur par id

module.exports.recupererUtilisateurParId = function(id,callback){
	Utilisateur.findById(id,callback)
};


//Verification des password

module.exports.comparaisonPassword = function(lePassword, hash, callback){
	bcrypt.compare(lePassword,hash,function(err,isMatch){
		if(err){
			return callback(err)
		}else{
			callback(null,isMatch)
		}
	});
};

//Ajouter utilisateur dans la base de données

module.exports.ajouterUtilisateur=function(utilisateur,callback){
	Utilisateur.create(utilisateur,callback)
}
