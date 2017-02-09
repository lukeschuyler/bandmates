bandmates.controller('LoginCtrl', function($scope, AuthFactory, $location, user, $state) {
	$scope.user = user
	console.log(user)
	$scope.login = function(email, password) {
		AuthFactory.login(email, password)
			// .then(console.log)
		// $state.go($state.current, {}, {reload: true});
		$location.url('tab/dash')
	}
	$scope.register = function(email, password, firstName, lastName) {
		AuthFactory.register(email, password, firstName, lastName)
			// .then(console.log)
		// $state.go($state.current, {}, {reload: true});
	 	$location.url('tab/dash')
	}
})
