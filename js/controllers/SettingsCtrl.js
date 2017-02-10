bandmates.controller('SettingsCtrl', function($scope, $location, AuthFactory, user, $state, $cordovaToast) {
	$scope.$on('$ionicView.enter', function(e) {
    	$scope.user = user
  	});
	console.log(user)
	
	$scope.logout = function(){
		AuthFactory.logout()
			.then(function() {
				console.log('goToLogin')
				$location.url('/auth/login')
			})
			.catch(function(){
				console.log('toast')
			})
	}

})
