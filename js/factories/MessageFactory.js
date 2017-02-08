bandmates.factory('MessageFactory', function($http) {
	var mushrooms;
	return {
		getThings() {
			return $http.get('https://mush-e7c8f.firebaseio.com/.json')
				.then((val) => {
					return val.data.mushrooms
				})
		}
	}
})
