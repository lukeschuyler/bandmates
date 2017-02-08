bandmates.controller('MessageBoardCtrl', function($scope, $stateParams, MessageFactory) {
  MessageFactory.getThings().then((val) => {
  	$scope.things = val
  	console.log($scope.things)
  })
})
