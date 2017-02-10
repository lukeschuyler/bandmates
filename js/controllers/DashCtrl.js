bandmates.controller('DashCtrl', function($scope, user, $cordovaImagePicker, $cordovaFile) {
	$scope.$on('$ionicView.enter', function(e) {
    	$scope.user = user
  	});
  	console.log(cordova.file)

  		function saveToFirebase(_imageBlob, _filename, _callback) {
  			alert('saving')

		var storageRef = firebase.storage().ref();

		var uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);

		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
		uploadTask.on('state_changed', function(snapshot){
		  // Observe state change events such as progress, pause, and resume
		  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
			alert('done')
		  // Handle successful uploads on complete
		  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
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
		        console.log('Image URI: ' + results[0]);
		        var fileName = results[0].replace(/^.*[\\\/]/, '')
		         $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
			      .then(function (success) {
			        // success
			        var imageBlob = new Blob([success], {type : 'image/jpeg'})

			        saveToFirebase(imageBlob, fileName, function(_response) {
			        	alert('hey')
			        	if(_response) {
			        		alert(_response.downloadURL)
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
