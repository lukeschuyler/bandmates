bandmates.controller('SettingsCtrl', function($scope, AuthFactory, user, $state) {
	$scope.user = user
	console.log(user)
	
	$scope.logout = function(){
		AuthFactory.logout()
		$scope.user = null
	}

})
