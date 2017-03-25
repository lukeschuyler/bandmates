bandmates.controller('DashCtrl', function($timeout, $scope, user, AuthFactory, CalFactory, BandFactory, $cordovaToast, $cordovaSocialSharing, $ionicScrollDelegate, $ionicSlideBoxDelegate) {

	 $scope.userBandNames =  []
	 $scope.events = []
	 $scope.name;
	 $scope.now;
	 $scope.scrolled = false;

	  $scope.toggleGroup = function(group) {
	    if ($scope.isGroupShown(group)) {
	      $scope.shownGroup = null;
	    } else {
	      $scope.shownGroup = group;
	    }
			$timeout(function () {
			  $ionicScrollDelegate.resize();
			}, 100);
	  };

	  $scope.isGroupShown = function(group) {
	    return $scope.shownGroup === group;
	  };

	 $scope.share = function(title, type, location, time, bandName, image) {
	 	let message = bandName + ' ' + title + ' ' + type + ' ' + location +  ' @' + time
	 	  $cordovaSocialSharing
		    .share(message, null, image) // Share via native share sheet
		    .then(function(result) {
		    	
		    }, function(err) {
		    	
		    });
	 }

	 $scope.firstTime = AuthFactory.getFirstTime()
 		if ($scope.firstTime === true) {
	 		setTimeout(function() {
	 			$cordovaToast.show('Welcome to Bandmates! Find Your Band Here or you can go the Register Band Page. Enjoy!', 'long', 'bottom')
	 			$scope.openModal(1)
	 			$scope.$apply()
	 		}, 2000)	 		
	 		setTimeout(function() {
		 			AuthFactory.setFirstTime(false)
		 		}, 5000)
 		}


	setTimeout(function() {
	 	if ($scope.userBandNames.length == 0) {
	 		$scope.enter()
	 	}
	 }, 3000)

 	$scope.dateFilter = function(date){
 		return new Date(date)
 	}

 	$scope.showDets = function(event) {
    	$ionicSlideBoxDelegate.next();
 	} 

 	 $scope.enter = function() {
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
								let date = new Date(val[key].startTime)
								$scope.now = new Date()
								if (date.getMinutes() < 10) {
									val[key].time = date.getHours() + ': 0' + date.getMinutes() 
								} else {
									val[key].time = date.getHours() + ': ' + date.getMinutes() 	
								}
								val[key].startTime = date.toDateString();
								if (date.getTime() < $scope.now.getTime()) {
									CalFactory.deleteEvent(key)
										.then(function() {
											if (val[key].type == 'Show') {
												CalFactory.archiveEvent(val[key])
											}
										})
								} else {
									$scope.events.push(val[key]);
								}
							})
						})
					})
				})

 	}

 	$scope.$on('$ionicView.enter', function(e) {
 		$scope.enter()
 	});


  $ionicSlideBoxDelegate.update();
  $scope.onUserDetailContentScroll = onUserDetailContentScroll


  function onUserDetailContentScroll(){
    var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
    var scrollView = scrollDelegate.getScrollView();
    $scope.$broadcast('userDetailContent.scroll', scrollView);
  }
})
