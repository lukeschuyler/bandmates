bandmates.controller('MusicNoteDetailCtrl', function($scope, ArchiveFactory, user, $stateParams, $sce, $ionicSlideBoxDelegate, $timeout) {
	$scope.band = $stateParams.project
	$scope.songNames = []
	$scope.setList = {}

	ArchiveFactory.getArchive($scope.band)
		.then((val) => {
			$scope.archivedEvents = Object.keys(val).map(function(key) {
						val[key].key = key
						return val[key]
					})
			$timeout(function() {
				$ionicSlideBoxDelegate.slide(0);
                $ionicSlideBoxDelegate.update();
			})
		})

	$scope.addSongs = function(songName) {
		let newSong = songName
		$scope.songNames.push(newSong)
		$scope.setList.songName = null
	}	

	$scope.saveList = function(list, key) {
		ArchiveFactory.saveList(list, key)
	}
})
