bandmates.controller('LoginCtrl', function($scope, AuthFactory) {
	$scope.login = function(email, password) {
		AuthFactory.login(email, password)
	}
	$scope.register = function(email, password) {
		AuthFactory.register(email, password)
	}
})
