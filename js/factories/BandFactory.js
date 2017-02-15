bandmates.factory('BandFactory', function($http) {
	let bands;
	return {
		getBands(userId, userName) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/bands.json?orderBy="key"&equalTo="${userName}"`)
			  .then((val) => {
			  	// bands = Object.keys(val.data).map(function(key) {
			   //      return val[key]
			   //    })
			  	// return bands
			  	return val.data
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
