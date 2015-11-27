var LocalStrategy=require('passport-local').Strategy;
var Utilisateur=require('../modeles/utilisateur');
var bcrypt=require('bcryptjs');


module.exports=function(passport){
	passport.serializeUser(function(utilisateur, done) {
		done(null, utilisateur.id);
	});

	passport.deserializeUser(function(id, done) {
		Utilisateur.recupererUtilisateurParId(id, function(err, utilisateur) {
			done(err, utilisateur);
		});
	});


	passport.use('local-register',new LocalStrategy({
		passReqToCallback:true
	},
	function(req,pseudo,password,done){
			findOrCreateUser=function(){
				Utilisateur.findOne({
					pseudo:pseudo
				},function(err,utilisateur){
					if(err){
						console.log('erreur ' +err);
						return done(err);
					}if(utilisateur){
						console.log('existe deja');
						return done(null,false,req.flash('message','Utilisateur deja existant'))
					}else{
						var nouveauUtilisateur = new Utilisateur();
						nouveauUtilisateur.pseudo = pseudo;
						nouveauUtilisateur.password = createHash(password);
						nouveauUtilisateur.email = req.param('email');
						nouveauUtilisateur.nom = req.param('nom');
						nouveauUtilisateur.creation = new Date();

						//Ajouter utilisateur
						Utilisateur.ajouterUtilisateur(nouveauUtilisateur,function(err,user){
							if(err){
								console.log('erreur :' +err)
								throw err;
							}else{
								req.flash('success', 'Vous etes maintenant inscrit et loggé');
								return done(null,nouveauUtilisateur);
							}
						});
					}
				});
			};
		process.nextTick(findOrCreateUser);
	}
	));
	var createHash= function(password){
		return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
	}
};
