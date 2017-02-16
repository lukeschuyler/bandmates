bandmates.controller('CalenderCtrl', function($scope, BandFactory, user, $ionicModal, CalFactory, $cordovaToast) {
	$scope.user = user
	$scope.tourLocations = []

	$scope.$on("$ionicView.enter", function () {
	firebase.database().ref('bands').on('child_added', function() {
      	 BandFactory.getBands(user.uid)
		 	.then(function(val){
		 		$scope.bandz = val
		 	})
		 })
    });

	$scope.addLocation = function(location) {
		$scope.tourLocations.push(location)
		$scope.tourLocation = null
	}

	$scope.deletePlace = function($index) {
		$scope.tourLocations.splice($index, 1)
	}

	$scope.bandsRef = firebase.database().ref('bands')

	CalFactory.getEvents()
		.then(function(val) {
			$scope.events = Object.keys(val).map(function(key) {
				return val[key]
			})
		})
 	

	$ionicModal.fromTemplateUrl('templates/eventModal.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	  })

	$scope.openModal = function(bandName) {
	  var boo= false
	  $scope.id = bandName;
		  $scope.modal.show();

    $scope.createEvent = function(id, eventName, type, startTimeValue, endTimeValue, boo, image, tourLocations) {
    	CalFactory.addEvent(id, eventName, type, startTimeValue, endTimeValue, boo, image, tourLocations)
    		.then(function() {
    			console.log('created')
    			 $scope.modal.hide();
    			 $cordovaToast.show('Event Created!', 'short', 'bottom')
    		})
    }
		  };
		  $scope.closeModal = function() {
		    $scope.modal.hide();
		  };
		  // Cleanup the modal when we're done with it!
		  $scope.$on('$destroy', function() {
		    $scope.modal.remove();
		  });
		  // Execute action on hide modal
		  $scope.$on('modal.hidden', function() {
		    // Execute action
		  });
		  // Execute action on remove modal
		  $scope.$on('modal.removed', function() {
		    	
		  });
});
