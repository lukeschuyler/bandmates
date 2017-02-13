bandmates.factory('BandFactory', function($http) {
	let bands;
	return {
		getBands(userId) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/bands.json?orderBy="userId"&equalTo="${userId}"`)
			  .then((val) => {
			  	bands = Object.values(val.data)
			  	return bands
			  })
		},
		getBandsLocal() {
			return bands
		},
		setBandsLocal() {
			bands.push(newBand)
			consolel.log(bands)
		}
	}
})
