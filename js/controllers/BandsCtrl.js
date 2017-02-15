bandmates.controller('BandsCtrl', function($scope, $location, AuthFactory, BandFactory, user) {

  $scope.user = user

  AuthFactory.getUserPic(user.uid)
    .then(function(val) {
      $scope.userArray = Object.keys(val).map(function(key) {
        return val[key]
      })
		$scope.name = $scope.userArray[0].firstName + $scope.userArray[0].lastName
    }).then(function() {
	  	BandFactory.getBands(user.uid, $scope.name)
		 	.then(function(val){
		 		$scope.bandz = val
		 	})
	    })

})
