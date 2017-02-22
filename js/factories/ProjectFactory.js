bandmates.factory('ProjectFactory', function($http) {
	return {
		getProjects() {
			return $http.get('https://mush-e7c8f.firebaseio.com/projects.json')
				.then(function (val) {
					return val.data
				})
		},
		getProject(key) {
			console.log(key)
			return $http.get(`https://mush-e7c8f.firebaseio.com/projects/${key}.json`)
				.then(function (val) {
					console.log(val)
					return val.data
				})
		},
		postAudio(uid) {
			return $http({
				method : 'POST',
				url : 'https://mush-e7c8f.firebaseio.com/projects.json',
				data : { name: name, url : 'https://firebasestorage.googleapis.com/v0/b/mush-e7c8f.appspot.com/o/Innocent%20Bounce%20013117%20MP3.mp3?alt=media&token=e3301d84-7cd7-4428-b13a-b8ac8076020a', band : 'The Common Tiger', userId : uid, notes : { note1 : 'More Bass in bridge', note2 : 'Less Guitar in Chorus' } }
			})
		}
	}
})
