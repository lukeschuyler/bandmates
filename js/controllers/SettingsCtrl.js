bandmates.controller('SettingsCtrl', function($scope, AuthFactory) {
	$scope.user = 'hello'
	$scope.logout = function(){
		AuthFactory.logout()
	}
})
