bandmates.factory('CalFactory', function($http) {
	return {
		getEvents(band) {
			return $http.get('https://mush-e7c8f.firebaseio.com/.json')
				.then(function(val) {
					return val.data
				})
		}
	}
})
