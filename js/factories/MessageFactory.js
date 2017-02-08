bandmates.factory('MessageFactory', function($http) {
	var mushrooms;
	return {
		getThings() {
			return $http.get('https://mush-e7c8f.firebaseio.com/.json')
				.then((val) => {
					return val.data.messages
				})
		},
		addMessage(message) {
			const messages = 'messages'
				if(message) {
					$http({
					method : 'POST',
					url : 'https://mush-e7c8f.firebaseio.com/messages.json',
					data : { message : message, name : 'name' }
				})
			}
		}
	}
})
