bandmates.controller('NewBandCtrl', function($scope, NewBandFactory, user) {
	$scope.user = user
	$scope.registerBand = NewBandFactory.registerBand
	$scope.joinBand = NewBandFactory.joinBand
})
