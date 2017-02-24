bandmates.factory('ArchiveFactory', function($http) {
	return {
		getArchive(band) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/archive.json`)
				.then((val) => {
					const archArray = Object.keys(val.data).map(function(key) {
						return val.data[key]
					})
					return archArray
				})
		}
	}
})
