bandmates.controller('MessageBoardCtrl', function($ionicScrollDelegate, $scope, $stateParams, MessageFactory, messages, user) {
	$scope.band = $stateParams.bandId

	$scope.messageRef = firebase.database().ref('messages')

	$scope.messageRef.on('child_added',function() {
		MessageFactory.getMessages().then((val) => {
	  	$scope.messages = val
	  	$ionicScrollDelegate.scrollBottom(true);
	  })
	})
	setTimeout(function() {
		$ionicScrollDelegate.scrollBottom(true);
	}, 300)


	$scope.name = user.email

  	$scope.addMessage = function(message, name) { 
	  	MessageFactory.addMessage(message, name);
	  	$scope.message = ''
	  }
})
