bandmates.factory('BandFactory', function($http) {
	return {
		getBands(userId) {
			console.log(userId)
			return $http.get(`https://mush-e7c8f.firebaseio.com/bands.json?orderBy="userId"&equalTo="${userId}"`)
			  .then((val) => {
			  	console.log(val)
			  	console.log('hello')
			  	return val.data
			  })
		}
	}
})
