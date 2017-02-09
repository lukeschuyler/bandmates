bandmates.controller('LoginCtrl', function($scope, AuthFactory, $location, user, $state) {
	$scope.$on('$ionicView.enter', function(e) {
    	$scope.user = user
  	});
	$scope.login = function(email, password) {
		AuthFactory.login(email, password)
	}
	$scope.register = function(email, password, firstName, lastName) {
		AuthFactory.register(email, password, firstName, lastName).then(console.log)
			// $location.url('/tab/dash')

	}
})
