angular.module('jsonMarkdownApp')
	.factory('InputService', ['$http', '$q', function ($http, $q){
		var sendInputData = function(data){
			return $http.post('/sendfields', data)
				.then(function(response){
					return $q.resolve(response);
				},
				function(rejection){
					//handles if headers are determined to be invalid.
					return $q.reject(rejection);
				});
		};
		return {
			sendInputData : sendInputData
		};
	}]);