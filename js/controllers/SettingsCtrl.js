bandmates.controller('SettingsCtrl', function($scope, $location, AuthFactory, user, $state, $cordovaToast) {
	$scope.$on('$ionicView.enter', function(e) {
    	$scope.user = user
    	console.log($scope.user)
  	});

	$scope.logout = function(){
		AuthFactory.logout()
			.then(function() {
				$location.url('/auth/login')
			})
			.catch(function(){
				console.log('toast')
			})
	}

})
