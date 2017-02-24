bandmates.factory('ArchiveFactory', function($http) {
	return {
		getArchive(band) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/archive.json?orderBy="bandName"&equalTo="band"`)
				.then((val) => {
					return val.data
				})
		}
	}
})
