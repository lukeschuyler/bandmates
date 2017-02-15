bandmates.factory('NewBandFactory', function($http, $cordovaToast) {
	let newKey;
	return {
		registerBand(bandName, password, userId, image, firstName, lastName) {
			const userName = firstName + lastName
			return $http({
				method : 'PATCH',
				url : 'https://mush-e7c8f.firebaseio.com/bands.json',
				data : { [bandName] : { bandName : bandName, password : password, userId : userId, image: image,[userName]: userId } }
			})
			.then(function(val) {
				newKey = val.data.name
				return newKey;
			})
		},
		joinBand(bandName, password, userId, firstName, lastName) {
			const userName = firstName + lastName
			return $http.get(`https://mush-e7c8f.firebaseio.com/bands/${bandName}.json`)
				.then(function(val) {
					if (val.data.password == password) {
						return $http({
							method : 'PATCH',
							url : `https://mush-e7c8f.firebaseio.com/bands/${bandName}.json`,
							data : { [userName] : userId } 
						})
					} else {
	    			 	$cordovaToast.show('Password Invalid', 'long', 'middle')				
					}
				})
		}
	}
})
