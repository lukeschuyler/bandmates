bandmates.controller('DashCtrl', function($scope, user) {
	$scope.$on('$ionicView.enter', function(e) {
    	$scope.user = user
  	});
})
