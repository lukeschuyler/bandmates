bandmates.controller('LoginCtrl', function($scope, AuthFactory, $location) {
	$scope.login = function(email, password) {
		AuthFactory.login(email, password)
		$scope.email = ''
		$scope.password = ''
		$location.url('/tab/dash')
	}
	$scope.register = function(email, password, firstName, lastName) {
		AuthFactory.register(email, password, firstName, lastName)
		$scope.email = ''
		$scope.password = ''
	 	$location.url('/tab/dash')
	}
})
