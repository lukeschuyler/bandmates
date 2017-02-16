bandmates.controller('NewBandCtrl', function(BandFactory, $scope, NewBandFactory, user, $ionicModal, AuthFactory, $location, $state, $ionicHistory, $cordovaToast, $cordovaImagePicker, $cordovaFile) {

  $scope.loadingPic;
  $scope.picLoaded = false;

  $scope.registerView = false;

	$scope.$on("$ionicView.enter", function () {
		$scope.user = user
    AuthFactory.getUserPic(user.uid)
    .then(function(val) {
      $scope.userArray = Object.keys(val).map(function(key) {
        return val[key]
      })
      $scope.name = $scope.userArray[0].firstName
    })
    BandFactory.getBands(user.uid)
      .then(function(val) {
        $scope.keys = Object.keys(val)
        $scope.bands = Object.keys(val).map(function(key) {
        return val[key]
      })
        for (let i = 0; i < $scope.bandz.length; i++) {
          $scope.bands[i].key = $scope.keys[i];
        }
    })
 });

  $scope.leaveBand = function(key, band) {
    BandFactory.leaveBand(key)
      .then(function() {
        $cordovaToast.show("Successfully left ' + band + '. Maybe one day you'll 'get the band back together'.", 'long', 'bottom')
      })
      .catch(function(){
        $cordovaToast.show("Sorry, there was an issue in remove you from the group. Please try again", 'long', 'bottom')
      })
}
  $scope.toggleRegister = function() {
    $scope.registerView = !$scope.registerView
  }

	$scope.registerBand = function(bandName, password, uid, image, userFirstName, userLastName) {
    NewBandFactory.registerBand(bandName, password, uid, image, userFirstName, userLastName)
      .then(function() {
             $scope.oModal1.hide();
             $cordovaToast.show('New Band Created! Go to the Events tab to create a new event!', 'long', 'bottom')
      })
  } 

	$scope.joinBand = function(band, password, uid, userFirstName, userLastName) {
    NewBandFactory.joinBand(band, password, uid, userFirstName, userLastName)
      .then(function(val) {
        if (val) {
          $scope.oModal1.hide();
          $cordovaToast.show(`Welcome to ${band} on Bandmates!`, 'long', 'center')
          $location.url('/tab/bands')
        } else {
            $cordovaToast.show('Password Invalid', 'long', 'center')  
        }
      })
      .catch(function(val) {
          $cordovaToast.show("Sorry, we cannot find an artist/band with that name...Go Register It!", 'long', 'center')
      })
  }

    $ionicModal.fromTemplateUrl('templates/new-band.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/settings.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });
 
	$scope.logout = function(){
		AuthFactory.logout()
			.then(function() {
				$location.url('/auth/login')
			})
			.catch(function(){
				console.log('toast')
			})
	}


   function saveToFirebase(_imageBlob, _filename, _callback) {

    var storageRef = firebase.storage().ref();

    var uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);

    uploadTask.on('state_changed', function(snapshot){

      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
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
            $scope.loadingPic = true
            var fileName = results[0].replace(/^.*[\\\/]/, '')
             $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
            .then(function (success) {
              // success 
              console.log('success')
              var imageBlob = new Blob([success], {type : 'image/jpeg'})

              saveToFirebase(imageBlob, fileName, function(_response) {
                if(_response) {
                  $scope.image = _response.downloadURL
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

})
