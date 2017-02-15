bandmates.controller('DashCtrl', function($scope, user, AuthFactory, CalFactory, BandFactory) {

	 $scope.userBandNames =  []
	 $scope.events = []
	 $scope.giveUp = false;
	 $scope.name

	 setTimeout(function() {
	 	$scope.giveUp = true
	 	$scope.$apply()
	 	if ($scope.userBandNames.length == 0) {
	 		$scope.openModal(1)
	 	}
	 }, 3000)

 	$scope.dateFilter = function(date){
 		return new Date(date)
 	}

 	$scope.showDets = function(event) {
 		console.log('dets')
 	} 


	 $scope.$on('$ionicView.enter', function(e) {
	    $scope.user = user
		AuthFactory.getUserPic(user.uid)
			.then(function(val) {
				$scope.userArray = Object.keys(val).map(function(key) {
					return val[key]
				})
				$scope.name = $scope.userArray[0].firstName + $scope.userArray[0].lastName
				console.log($scope.name)
			}).then(function() {
				BandFactory.getBands(user.uid, $scope.name)
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
	});
})
