bandmates.controller('NewBandCtrl', function($scope, NewBandFactory, user) {
	$scope.$on("$ionicView.enter", function () {
		$scope.user = user
    });
	$scope.registerBand = NewBandFactory.registerBand
	$scope.joinBand = NewBandFactory.joinBand
})
