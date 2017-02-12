bandmates.controller('DashCtrl', function($scope, user, AuthFactory) {

 $scope.$on('$ionicView.enter', function(e) {
    $scope.user = user
  });

	AuthFactory.getUserPic(user.uid)
		.then(function(val) {
			$scope.userArray = Object.keys(val).map(function(key) {
				return val[key]
			})
		})

})
