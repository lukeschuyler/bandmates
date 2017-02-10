bandmates.controller('MessageBoardCtrl', function($ionicScrollDelegate, $scope, $stateParams, MessageFactory, messages, user, AuthFactory) {
	AuthFactory.getUserPic(user.uid)
		.then(function(val) {
			$scope.userArray = Object.keys(val).map(function(key) {
				return val[key]
			})
			console.log($scope.userArray[0].image)
		})

	$scope.band = $stateParams.bandId
	$scope.visible = false

	$scope.messageRef = firebase.database().ref('messages')

	$scope.messageRef.on('child_added',function() {
		MessageFactory.getMessages($scope.band).then((val) => {
	  	$scope.messages = val
	  	$ionicScrollDelegate.scrollBottom(true);
	  })
	})
	setTimeout(function() {
		$ionicScrollDelegate.scrollBottom(true);
		$scope.visible = true
	}, 300)


	$scope.name = user.email

  	$scope.addMessage = function(message, name, band, userImage) { 
	  	MessageFactory.addMessage(message, name, band, userImage);
	  	$scope.message = ''
	  }
})
