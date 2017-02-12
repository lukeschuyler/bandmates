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

	CalFactory.getAllEvents()
		.then(function(val) {
			$scope.events = Object.keys(val).map(function(key) {
				return val[key]
			})
			console.log($scope.events)
		})

		$scope.moveItem = function(item, fromIndex, toIndex) {
		    //Move the item in the array
		    $scope.events.splice(fromIndex, 1);
		    $scope.events.splice(toIndex, 0, item);
		  };
})
