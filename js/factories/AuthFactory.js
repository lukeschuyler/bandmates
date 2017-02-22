bandmates.factory('AuthFactory', function($http, $q, $location, $cordovaToast) {
	let userArray;
	let firstTime = false 
	return {
		login(email, password) {
				firstTime = false
				return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, password))
		},
		register(email, password, firstName, image, lastName) {
			return $q.resolve(firebase.auth().createUserWithEmailAndPassword(email, password)
			  .then(function() {
			  	firstTime = true;
				  const id = firebase.auth().currentUser.uid
				  $http({
					  method : 'POST',
					  url : 'https://mush-e7c8f.firebaseio.com/users.json',
					  data : { id : id, firstName : firstName, lastName : lastName, image : image }
				  })
			  }))
			  .catch(function() {
			  	// toast to try again
			  	console.log('toast')
			  })
		},
		logout() {
			return $q.resolve(firebase.auth().signOut())
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
      },
  		getFirstTime() {
			return firstTime
		},
		setFirstTime(bool) {
			firstTime = bool
		}
	}
})
