bandmates.factory('NewBandFactory', function($http) {
	return {
		registerBand(bandName, password, userId) {
			return $http({
				method : 'POST',
				url : 'https://mush-e7c8f.firebaseio.com/bands.json',
				data : { bandName : bandName, password : password, userId : userId }
			})
		}
	}
})
