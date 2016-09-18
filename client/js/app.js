angular.module('jsonMarkdownApp', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/', {
			templateUrl : './tableview.html',
			controller : 'InputController'
		});
		// .when('/somethingelse', {
		// 	templateUrl : 'somethingelse.html',
		// 	controller : 'somethingelse'
		// })
	}])
	.run();