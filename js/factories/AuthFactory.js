bandmates.factory('AuthFactory', function($http) {
	return {
		login(email, password) {
			firebase.auth().signInWithEmailAndPassword(email, password)
		},
		register(email, password) {
			firebase.auth().createUserWithEmailAndPassword(email, password)
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
