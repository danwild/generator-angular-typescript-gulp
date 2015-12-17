
angular.module('demo.module', [])

.directive('demo', [function() {

	return {
		controller : 'appController',
		templateUrl: 'src/demo/demo.html'
	};

}])

.controller('appController', ['$scope', 'appService', function($scope, appService) {

	$scope.appService = appService;

}])

.factory('appService', [function() {

	var service = {
		getExcited: false
	};

	return service;

}]);
