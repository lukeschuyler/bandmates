bandmates.factory('BandFactory', function($http) {
	return {
		getBands(userId) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/bands.json?orderBy="userId"&equalTo="${userId}"`)
			  .then((val) => {
			  	return val.data
			  })
		}
	}
})
