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
		}
	}
})
