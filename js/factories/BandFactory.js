bandmates.factory('BandFactory', function($http) {
	let bands;
	return {
		getBands(userId, userName) {
			// return $http.get(`https://mush-e7c8f.firebaseio.com/bands.json?orderBy="${userName}"&equalTo="${userId}"`)
			return $http.get(`https://mush-e7c8f.firebaseio.com/bands.json`)
			  .then((val) => {
			  	return val.data
			  })
		},
		getBandsLocal() {
			return bands
		},
		setBandsLocal() {
			bands.push(newBand)
		}
	}
})
