bandmates.factory('MessageFactory', function($http) {
	return {
		getMessages(band) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/messages.json?orderBy="band"&equalTo="${band}"`)
				.then((val) => {
					return val.data
				})
		},
		addMessage(message, name, band, userImage) {
			let date = new Date()
				if(message) {
					$http({
					method : 'POST',
					url : 'https://mush-e7c8f.firebaseio.com/messages.json',
					data : { message : message, name : name, band : band, userImage : userImage, time : date.getTime() }
				})
			}
		}
	}
})
