bandmates.controller('CalenderCtrl', function($scope, BandFactory, user, $ionicModal, CalFactory, $cordovaToast, $cordovaFile, $cordovaImagePicker) {
	$scope.user = user
	$scope.tourLocations = []
	$scope.searchPlaces;
	$scope.newEvent = {}

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
	  $scope.picLoaded = false
	  $scope.newEvent = {}
	  $scope.id = bandName;
	  $scope.modal.show();

    $scope.createEvent = function(id, eventName, type, startTimeValue, endTimeValue, boo, location, bandimage, image) {

    	bandimage = bandImage

    	CalFactory.addEvent(id, eventName, type, startTimeValue, endTimeValue, boo, location, bandImage, image)
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
		  	 $scope.newEvent = {}
		  });
		  // Execute action on remove modal
		  $scope.$on('modal.removed', function() {
		    	 $scope.newEvent = {}
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

   function saveToFirebase(_imageBlob, _filename, _callback) {

    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child('images/' +  new Date().getTime() + _filename).put(_imageBlob);

    uploadTask.on('state_changed', function(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
      alert(error.message)
      _callback(null)
    }, function() {
      var downloadURL = uploadTask.snapshot.downloadURL;
      _callback(uploadTask.snapshot)
    });
  }

  $scope.getImage = function() {
    var options = {
       maximumImagesCount: 1,
       width: 800,
       height: 800,
       quality: 80
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
            var fileName = results[0].replace(/^.*[\\\/]/, '')
             $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
            .then(function (success) {
              // success 
              $scope.loadingPic = true
              var imageBlob = new Blob([success], {type : 'image/jpeg'})

              saveToFirebase(imageBlob, fileName, function(_response) {
                if(_response) {
                  $scope.newEvent.image = _response.downloadURL
                  $scope.loadingPic = false;
                  $scope.picLoaded = true;
                  $scope.$apply()
                }
              })
            }, function (error) {
              // error
              alert('error getting')
            });

        }, function(error) {
          // error getting photos
          alert('error getting')
        });
  }
});
