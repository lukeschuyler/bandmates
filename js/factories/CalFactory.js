bandmates.factory('CalFactory', function($http) {
	var date = new Date()
	var startDay = Math.floor(Math.random() * 90) - 45;
    var endDay = Math.floor(Math.random() * 2) + startDay;
	var startMinute = Math.floor(Math.random() * 24 * 60);
    var endMinute = Math.floor(Math.random() * 180) + startMinute;
	let startTimeGig = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
	let endTimeGig = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
	// let startTimePrac = new Date(Date.UTC(2017, 1, 13));
	// let endTimePrac = new Date(Date.UTC(2017, 1, 13));
	// let startTimeSess = new Date(Date.UTC(2017, 3, 13));
	// let endTimeSess = new Date(Date.UTC(2017, 3, 13));

	const events = [{
						title: 'TCT Gig',
                        startTime: startTimeGig,
                        endTime: endTimeGig,
                        allDay: false
					}]

	return {
		getEvents(band) {
			// return $http.get('https://mush-e7c8f.firebaseio.com/events.json')
			// 	.then(function(val) {
			// 		return val.data
			// 	})
			return events
		},
		addEvent(bandName, type, startTime, endTime, allDay, description) {
			$http({
				method : 'POST',
				url : `https://mush-e7c8f.firebaseio.com/events`,
				data : {
					bandName : bandName,
					type : type,
					startTime : startTime,
					endTime : endTime,
					title : title,
					allDay : allDay,
					description : description
					}
			})
		}
	}
})
