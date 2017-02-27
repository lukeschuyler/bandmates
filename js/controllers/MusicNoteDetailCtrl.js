bandmates.controller('MusicNoteDetailCtrl', function($scope, ArchiveFactory, user, $stateParams, $sce, $ionicSlideBoxDelegate, $timeout) {
	$scope.band = $stateParams.project
	$scope.songNames = []
	ArchiveFactory.getArchive($scope.band)
		.then((val) => {
			$scope.archivedEvents = Object.keys(val).map(function(key) {
						val[key].key = key
						return val[key]
					})
			console.log($scope.archivedEvents)
			$timeout(function() {
				$ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
			})
		})

	$scope.addSongs = function(songName) {
		$scope.songNames.push(songName)
	}	

	$scope.saveList = function(list, key) {
		ArchiveFactory.saveList(list, key)
	}
})
