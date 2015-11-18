// app.js
// Crée l'app angular et injecte ngAnimate et ui-router
// =============================================================================
var app = angular.module('animateApp', ['ngAnimate', 'ui.router']);

// app.js

// define our application and pull in ngRoute and ngAnimate
//var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

// ROUTING ===============================================
// set our routing for this application
// each route will pull in a different controller
app.config(function($stateProvider, $urlRouterProvider,$interpolateProvider) {
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	$stateProvider

	// Route pour montrer le formulaire (/form)
		.state('login', {
			url: '/login',
			templateUrl: '/views/page-login.html',
			controller: 'loginController'
		})

		.state('inscription', {
			url: '/inscription',
			templateUrl: '/views/page-inscription.html',
			controller: 'inscriptionController'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: '/views/page-contact.html',
			controller: 'contactController'
		});
	// Si aucunes routes ne correspond
	// envoie l'user au formulaire
	$urlRouterProvider.otherwise('/login');



});


// CONTROLLERS ============================================
// login page controller
app.controller('loginController', function($scope) {
	//Bind au scope pageClass, ainsi dans la vue on a une class qui prend la valeur de pageClass
	$scope.pageClass = 'page-login';
});

// inscription page controller
app.controller('inscriptionController', function($scope) {
	//Bind au scope pageClass, ainsi dans la vue on a une class qui prend la valeur de pageClass
	$scope.pageClass = 'page-inscription';
});

// contact page controller
app.controller('contactController', function($scope) {
	//Bind au scope pageClass, ainsi dans la vue on a une class qui prend la valeur de pageClass
	$scope.pageClass = 'page-contact';
});
