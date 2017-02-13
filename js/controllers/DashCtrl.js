bandmates.controller('DashCtrl', function($scope, user, AuthFactory, CalFactory, BandFactory) {

 $scope.userBandNames =  []

 $scope.$on('$ionicView.enter', function(e) {
    $scope.user = user
  });

 	$scope.dateFilter = function(date){
 		return new Date(date)
 	}


 	$scope.events = []
	AuthFactory.getUserPic(user.uid)
		.then(function(val) {
			$scope.userArray = Object.keys(val).map(function(key) {
				return val[key]
			})
		})

	BandFactory.getBands(user.uid)
		.then(function(val) {
			$scope.userBands = Object.keys(val).map(function(key) {
				return val[key]
			})
			$scope.userBands.forEach(function(band) {
			$scope.userBandNames.push(band.bandName)
			})
		})
		.then(function() {
			$scope.userBandNames.forEach(function(band) {
				CalFactory.getUserBandsEvents(band)
				.then(function(val) {
					 Object.keys(val).map(function(key) {
						$scope.events.push(val[key])
					})
				})
			})
		})
})
