bandmates.controller('MessageBoardCtrl', function($ionicScrollDelegate, $scope, $stateParams, MessageFactory, user, AuthFactory) {
	AuthFactory.getUserPic(user.uid)
		.then(function(val) {
			$scope.userArray = Object.keys(val).map(function(key) {
				return val[key]
			})
			$scope.name = $scope.userArray[0].firstName
		})

	$scope.now;

	$scope.band = $stateParams.bandId
	$scope.visible = false

	$scope.messagez=[]

	$scope.messageRef = firebase.database().ref('messages')


	$scope.messageRef.on('child_added',function(snap) {
	let data = snap.val()
	let date = new Date(data.time)
	$scope.now = new Date()
	setTimeout(function() {
		$ionicScrollDelegate.scrollBottom(true);
		$scope.visible = true
	}, 300)
	if (date.getMinutes() < 10) {
		data.newTime = date.toDateString() + ' ' + date.getHours() + ': 0' + date.getMinutes() 
	} else {
		data.newTime = date.toDateString() + ' ' + date.getHours() + ': ' + date.getMinutes() 	
	}
		$scope.messagez.push(data)

		if(!$scope.$$phase) {
			$scope.$apply()
		}
	})
	
	$scope.scroll = function() {
		setTimeout(function() {
			$ionicScrollDelegate.scrollBottom(true);
			$scope.visible = true
		}, 700)
	}

	$scope.scroll()

  	$scope.addMessage = function(message, name, band, userImage) { 
	  	MessageFactory.addMessage(message, name, band, userImage);
	  	$scope.message = ''
	  }
})
