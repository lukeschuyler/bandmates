bandmates.factory('NewBandFactory', function($http, $cordovaToast) {
	let newKey;
	return {
		registerBand(bandName, password, userId, image, firstName, lastName) {
			 return $http({
				method : 'POST',
				url : 'https://mush-e7c8f.firebaseio.com/bands.json',
				data : { bandName : bandName, userId : userId, image: image }
			})
			.then(function() {
				return $http({
					method : 'PATCH',
					url : 'https://mush-e7c8f.firebaseio.com/bandpass.json',
					data : { [bandName] : { password : password, image : image} }
				})
			})
		},
		joinBand(bandName, password, userId, firstName, lastName) {
			const userName = firstName + lastName
			return $http.get(`https://mush-e7c8f.firebaseio.com/bandpass/${bandName}.json`)
				.then(function(val) {
					if (val.data.password == password) {
						return $http({
							method : 'POST',
							url : `https://mush-e7c8f.firebaseio.com/bands.json`,
							data : { bandName : bandName, userId : userId, image: val.data.image }
						})
						.then(function() {
							$cordovaToast.show(`Welcome to ${bandName} on Bandmates!`, 'long', 'center')
						})
					} else {
	    			 	$cordovaToast.show('Password Invalid', 'long', 'center')				
					}
				})
		}
	}
})
