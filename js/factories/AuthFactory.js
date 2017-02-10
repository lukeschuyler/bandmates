bandmates.factory('AuthFactory', function($http, $q, $location, $cordovaToast) {
	return {
		login(email, password) {
			return $q((resolve, reject) => {
				firebase.auth().signInWithEmailAndPassword(email, password)
					.catch(function() {
	               $cordovaToast.show('Invalid Username/Password', 'long', 'center')
				})
			})
		},
		register(email, password, firstName, image, lastName) {
			return $q(firebase.auth().createUserWithEmailAndPassword(email, password)
			  .then(function() {
				  const id = firebase.auth().currentUser.uid
				  $http({
					  method : 'POST',
					  url : 'https://mush-e7c8f.firebaseio.com/users.json',
					  data : { id : id, firstName : firstName, lastName : lastName, image : image }
				  })
				  $location.url('/tab/dash')
			  }))
			  .catch(function() {
			  	// toast to try again
			  })
		},
		logout() {
			firebase.auth().signOut()
		},
		getUserPic(uid) {
			return $http.get(`https://mush-e7c8f.firebaseio.com/users.json?orderBy="id"&equalTo="${uid}"`)
				.then((val) => {
					return val.data
				})
		},
		getUser () {
        return $q((resolve, reject) => {
          // http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe()
            if (user) {
              resolve(user)
            } else {
              reject()
            }
          })
        })
      }
	}
})
