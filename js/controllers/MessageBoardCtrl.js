bandmates.controller('MessageBoardCtrl', function($scope, $stateParams, MessageFactory) {
	$scope.messageRef = firebase.database().ref('messages')
	$scope.messageRef.on('child_added',function() {
		MessageFactory.getMessages().then((val) => {
	  	$scope.messages = val
	  })
	})
  MessageFactory.getMessages().then((val) => {
  	$scope.messages = val
  })
  $scope.addMessage = function(message) { 
  	MessageFactory.addMessage(message);
  	$scope.message = ''
  }
})
