var express = require('express');
var router = express.Router();

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

module.exports = router;
