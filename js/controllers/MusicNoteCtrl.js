bandmates.controller('MusicNoteCtrl', function($scope, user, ArchiveFactory, BandFactory, $cordovaFile) {

	$scope.$on("$ionicView.enter", function () {
		firebase.database().ref('bands').on('child_added', function() {
	      	 BandFactory.getBands(user.uid)
			 	.then(function(val){
			 		$scope.bandz = val
			 	})
			 })
	 });
})
