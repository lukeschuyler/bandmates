bandmates.factory('NewBandFactory', function($http) {
	return {
		registerBand(bandName, password, userId, image) {
			return $http({
				method : 'POST',
				url : 'https://mush-e7c8f.firebaseio.com/bands.json',
				data : { bandName : bandName, password : password, userId : userId, image: image }
			})
			.then(function(val) {
				return val.data.name
			})
		},
		joinBands(bandName, password, userId) {

		}
	}
})
