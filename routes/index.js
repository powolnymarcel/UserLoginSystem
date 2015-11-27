var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy = require('passport-local').Strategy;
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Veuillez vous connecter' });
// });
//
//
// /* GET home page. */
// router.get('/inscription', function(req, res, next) {
// 	res.render('inscription', { title: 'inscription' });
// });
//
// /* GET home page. */
// router.get('/dashboard', function(req, res, next) {
// 	res.render('dashboard', { title: 'dashboard',layout:'dashboard_layout' });
// });
//


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('angular', { title: 'accueil',layout:'angular_layout' });
});

router.post('/inscription', function(req, res, next) {
	console.log(req.body.nom);
	//res.sendStatus(200)

	var nom =					req.body.nom;
	var email =					req.body.email;
	var pseudo =				req.body.pseudo;
	var password =				req.body.password;
	var confirmer_password =	req.body.confirmer_password;
//Validation des champs
	req.checkBody('nom','Le champs nom est requis').notEmpty();
	req.checkBody('pseudo','Le champs pseudo est requis').notEmpty();
	req.checkBody('email','Le champs email est requis').notEmpty();
	req.checkBody('email','format: foo@gmail.com').isEmail();
	req.checkBody('password','Le champs password est requis').notEmpty();
	req.checkBody('confirmer_password','Les champs mot de passe ne correspondent pas').equals(req.body.password)

	var erreurs = req.validationErrors();
	if(erreurs){
		res.send({errors:erreurs});
		//res.send(erreurs);
		console.log(erreurs);

	}else{		console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");

		passport.authenticate('local-register',{
			successRedirect:'/dashboard',
			failureRedirect:'/',
			failureFlash:true
		})(req,res,next)
	}


});

module.exports = router;
