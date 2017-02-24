bandmates.controller('LoginCtrl', function($scope, AuthFactory, $location, $state, $cordovaToast, $cordovaImagePicker, $cordovaFile) {

  $scope.loadingPic;
  $scope.picLoaded = false;

	$scope.login = function(email, password) {
		AuthFactory.login(email, password)
			.then(function() {
				$location.url('/tab/dash')
			})
			.catch(function() {
				$cordovaToast
	    			.show('Incorrect Email/Password', 'long', 'bottom')
				  })
	}
	
	$scope.register = function(email, password, firstName, image, lastName) {
		AuthFactory.register(email, password, image, firstName, lastName)
			.then(function(){
				$location.url('/tab/dash')
			})
	}

	$scope.goToLogin = function() {
		$location.url('/auth/login')
	}

	$scope.goToRegister = function() {
		$location.url('/auth/register')
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
		        var fileName = results[0].replace(/^.*[\\\/]/, '')
		         $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
			      .then(function (success) {
					$scope.loadingPic = true;
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
