bandmates.controller('BandsCtrl', function($scope, $location, AuthFactory, BandFactory, user) {

$scope.user = user

$scope.$on("$ionicView.enter", function () {
      	 BandFactory.getBands(user.uid)
		 	.then(function(val){
		 		$scope.bandz = val
		 	})
    });


})
