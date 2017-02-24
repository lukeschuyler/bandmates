bandmates.controller('CalenderCtrl', function($scope, BandFactory, user, $ionicModal, CalFactory, $cordovaToast) {
	$scope.user = user
	$scope.tourLocations = []
	$scope.searchPlaces;

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

	$scope.openModal = function(bandName, bandImage) {
	  var boo = false
	  $scope.id = bandName;

	  $scope.modal.show();



    $scope.createEvent = function(id, eventName, type, startTimeValue, endTimeValue, boo, location, image) {
    	console.log(location)
    	console.log($scope.practice)
    	if (!image) {
    		image = bandImage;
    	}
    	if (!location) {
    		location = $scope.practice
    	}

    	CalFactory.addEvent(id, eventName, type, startTimeValue, endTimeValue, boo, location, image)
    		.then(function() {
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

		  });
		  // Execute action on remove modal
		  $scope.$on('modal.removed', function() {
		    	
		  });


		  $scope.autoFillPlaces = function(query){
			CalFactory.autoFillPlaces(query)
				.then((val) => {
					$scope.searchPlaces = val	
				})
				.then(function() {
                    return {
                      items: $scope.searchPlaces
                    };
				})
		        return {
                    items: $scope.searchPlaces
                };
		 }


        $scope.itemsClicked = function (callback) {
            $scope.clickedValueModel = callback;
        };
        $scope.itemsRemoved = function (callback) {
            $scope.removedValueModel = callback;
        };
});
