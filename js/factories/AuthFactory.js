bandmates.factory('AuthFactory', function($http, $q) {
	return {
		login(email, password) {
			firebase.auth().signInWithEmailAndPassword(email, password)
		},
		register(email, password, firstName, lastName) {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			  .then(function() {
				  const id = firebase.auth().currentUser.uid
				  $http({
					  method : 'POST',
					  url : 'https://mush-e7c8f.firebaseio.com/users.json',
					  data : { id : id, firstName : firstName, lastName : lastName }
				  })
			  })
		},
		logout() {
			firebase.auth().signOut()
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
