bandmates.controller('SettingsCtrl', function($scope, AuthFactory, user, $state) {
	$scope.$on('$ionicView.enter', function(e) {
    	$scope.user = user
  	});
	
	$scope.logout = function(){
		AuthFactory.logout()
		$scope.user = null
	}

})
