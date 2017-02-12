bandmates.controller('DashCtrl', function($scope, user, AuthFactory, CalFactory) {

 $scope.$on('$ionicView.enter', function(e) {
    $scope.user = user
    console.log(user)
  });

	AuthFactory.getUserPic(user.uid)
		.then(function(val) {
			$scope.userArray = Object.keys(val).map(function(key) {
				return val[key]
			})
		})

	CalFactory.getEvents()
		.then(function(val) {
			$scope.events = Object.keys(val).map(function(key) {
				return val[key]
			})
			console.log($scope.events)
		})

})
