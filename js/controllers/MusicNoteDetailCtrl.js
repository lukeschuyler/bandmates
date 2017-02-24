bandmates.controller('MusicNoteDetailCtrl', function($scope, ArchiveFactory, user, $stateParams, $sce) {
	$scope.band = $stateParams.project
	ArchiveFactory.getArchive($scope.band)
		.then((val) => {
			console.log(val)
			$scope.archivedEvents = val
		})

})
