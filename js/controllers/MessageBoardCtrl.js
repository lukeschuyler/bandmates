bandmates.controller('MessageBoardCtrl', function($scope, $stateParams, MessageFactory, messages, user) {
	$scope.band = $stateParams.bandId

	$scope.messageRef = firebase.database().ref('messages')

	$scope.messageRef.on('child_added',function() {
		MessageFactory.getMessages().then((val) => {
	  	$scope.messages = val
	  })
	})

	console.log(messages)

	// MessageFactory.getMessages().then((val) => {
	//  $scope.messages = val
 //    })

  	$scope.addMessage = function(message, name) { 
	  	MessageFactory.addMessage(message, name);
	  	$scope.message = ''
	  }
})
