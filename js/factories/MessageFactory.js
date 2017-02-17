bandmates.factory('MessageFactory', function($http) {
	return {
		getMessages(band) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/messages.json?orderBy="band"&equalTo="${band}"`)
				.then((val) => {
					return Object.keys(val.data).map(function(key) {
						return val.data[key]
					})
				})
		},
		addMessage(message, name, band, userImage) {
			let date = new Date()
			var data;
			if(userImage) {
				data = { message : message, name : name, band : band, userImage : userImage, time : date.getTime() }
			} else {
				data = { message : message, name : name, band : band, time : date.getTime() }				
			}
				if(message) {
					messageRef.push(data)
			}
		},
		getAvatars(bandName) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/bandpass/${bandName}/userimages.json`)
				.then((val) => {
					return Object.keys(val.data).map(function(key) {
						return val.data[key]
					})
				})
		}
	}
})
