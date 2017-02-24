bandmates.controller('MusicNoteCtrl', function($scope, ProjectFactory, $cordovaFile) {
	ProjectFactory.getProjects()
		.then(function(val) {
			$scope.projects = Object.keys(val).map(function(key) {
				val[key].key = key
				return val[key]
			})
		})

	$scope.postAudio = ProjectFactory.postAudio

	$scope.getAudio = function() {

	 window.plugins.mediapicker.getAudio(success,error,multiple,icloud);

	var multiple = 'false' // Will allow user to select only one song.

	var icloud = 'false' // Will only show songs available locally on device.


	function error(e) {
      console.log(e);
      console.log('error')
    }

	function success(data) {
	   alert(data[0].exportedurl.replace(/^.*[\\\/]/, ''))
 	   var fileName = data[0].exportedurl.replace(/^.*[\\\/]/, '')
 	   alert(fileName, 'fileName')
 	   alert($cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName))
       console.log($cordovaFile)
       console.log(cordova.file.tempDirectory)
       $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
   		.then(function(success) {
   			alert('success')
   		   alert(success)
	       var audioBlob = new Blob([success], {type : 'audio/m4a'})
              saveToFirebase(audioBlob, fileName, function(_response) {
                if(_response) {
                alert(_response)
                  $scope.loadingAudio = false;
                  $scope.audioLoaded = true;
                  $scope.$apply()
                } else {
                	alert('fail')
                }
      		})
   		})
	    }
	}

	function saveToFirebase(_audioBlob, _filename, _callback) {

	    var storageRef = firebase.storage().ref();

	    var uploadTask = storageRef.child('audio/' + _filename).put(_audioBlob);

	    uploadTask.on('state_changed', function(snapshot){

	      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	      // progress bar
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
})
