bandmates.factory('MessageFactory', function($http) {
	return {
		getMessages(band) {
			console.log(band)
			return $http.get(`https://mush-e7c8f.firebaseio.com/.json?orderBy="band"&equalTo="${band}"`)
				.then((val) => {
					return val.data.messages
				})
		},
		addMessage(message, name, band) {
				if(message) {
					$http({
					method : 'POST',
					url : 'https://mush-e7c8f.firebaseio.com/messages.json',
					data : { message : message, name : name, band : band }
				})
			}
		}
	}
})
