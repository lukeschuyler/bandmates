bandmates.factory('NewBandFactory', function($http, $cordovaToast, $q) {
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
				.then(function() {
					$cordovaToast.show(`Welcome to ${bandName} on Bandmates!`, 'long', 'center')
				})				
			})
		},
		joinBand(bandName, password, userId, firstName, lastName, image) {
			const userName = firstName + lastName
			return $http.get(`https://mush-e7c8f.firebaseio.com/bandpass/${bandName}.json`)
				.then(function(val) {
					return $q ((resolve, reject) => {
						if (val.data) {
							if (val.data.password == password) {
									 $http({
										method : 'POST',
										url : `https://mush-e7c8f.firebaseio.com/bands.json`,
										data : { bandName : bandName, userId : userId, image: val.data.image }
									})
								resolve(true)
							} else {
								resolve(false)
							}							
					} else {
						reject()
					}
				})
			})			
		}
	}
})
