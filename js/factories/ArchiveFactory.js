bandmates.factory('ArchiveFactory', function($http) {
	return {
		getArchive(band) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/archive.json`)
				.then((val) => {
					return val.data
				})
		},
		saveList(list, key) {
			return $http({
				method : 'PUT',
				url : `https://mush-e7c8f.firebaseio.com/archive/${key}/setList.json`,
				data : list 
			})
		}
	}
})
