bandmates.factory('MessageFactory', function($http) {
	var mushrooms;
	return {
		getMessages() {
			return $http.get('https://mush-e7c8f.firebaseio.com/.json')
				.then((val) => {
					return val.data.messages
				})
		},
		addMessage(message, name) {
				if(message) {
					$http({
					method : 'POST',
					url : 'https://mush-e7c8f.firebaseio.com/messages.json',
					data : { message : message, name : name }
				})
			}
		},
		getBoards(user) {
			// query firebase for boards only pertaining to user
			console.log('getBoards')
		}
	}
})
