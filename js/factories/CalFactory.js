bandmates.factory('CalFactory', function($http, $q) {
	return {
		getEvents(band) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/events.json?orderBy="bandName"&equalTo="${band}"`)
				.then(function(val) {
					return val.data
				})
		},
		getAllEvents() {
			return $http.get('https://mush-e7c8f.firebaseio.com/events.json')
				.then(function(val) {
					return val.data
				})
		},
		getUserBandsEvents(band) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/events.json?orderBy="bandName"&equalTo="${band}"`)
				.then(function(val) {
					return val.data
				})
		},
		addEvent(bandName, name, type, startTime, endTime, allDay, location, tourLocations, image) {
			return $q.resolve($http({
				method : 'POST',
				url : `https://mush-e7c8f.firebaseio.com/events.json`,
				data : {
					bandName : bandName,
					type : type,
					startTime : startTime,
					endTime : endTime,
					title : name,
					allDay : allDay,
					milliTime: startTime.getTime(),
					image : image,
					location : location,
					tourLocations: tourLocations
					}
			}))
		},
		autoFillPlaces(location) {
			return $http.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${location}&types=establishment&location=36.1627,-86.7816&radius=500&key=AIzaSyCCpxJ2S1bKd1tMxxHUAF6o5c_PYwkEuOY`)
				.then((val) => {
					return val.data.predictions
				})
		},
		// getVenues() {
		// 	return $http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1627,-86.7816&radius=500&types=e&key=AIzaSyCCpxJ2S1bKd1tMxxHUAF6o5c_PYwkEuOY`)
		// 		.then(function(val) {
		// 			return val.data.results
		// 		})
		// },
		deleteEvent(key) {
			return $http({
				method: 'DELETE',
				url : `https://mush-e7c8f.firebaseio.com/events/${key}.json`
			})
		}
	}
})
