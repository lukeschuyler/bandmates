bandmates.controller('MessageBoardCtrl', function($scope, $stateParams, MessageFactory) {
	$scope.messageRef = firebase.database().ref('messages')
	$scope.messageRef.on('child_added',function() {
		MessageFactory.getThings().then((val) => {
	  	$scope.messages = val
	  })
	})
  MessageFactory.getThings().then((val) => {
  	$scope.messages = val
  })
  $scope.addMessage = function(message) { 
  	MessageFactory.addMessage(message);
  	$scope.message = ''
  }
})
