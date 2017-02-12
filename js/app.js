 const config = {
    apiKey: "AIzaSyBV-JAYS7noyD20hpSEUbDnYnzxZ6Jm4WU",
    authDomain: "mush-e7c8f.firebaseapp.com",
    databaseURL: "https://mush-e7c8f.firebaseio.com",
    storageBucket: "mush-e7c8f.appspot.com",
    messagingSenderId: "934980040091"
  };
  firebase.initializeApp(config);

const bandmates = angular.module('bandmates', ['ionic', 'ui.rCalendar', 'ngCordova', "ion-datetime-picker"])

bandmates.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

bandmates.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('auth', {
      url: '/auth',
      templateUrl: 'templates/auth.html',
      abstract: true

  })

    .state('auth.login', {
    // cache : false,
    url: '/login',
    views: {
      'auth': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

    .state('auth.register', {
    // cache : false,
    url: '/register',
    views: {
      'auth': {
        templateUrl: 'templates/register.html',
        controller: 'LoginCtrl'
      }
    }
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      resolve: {
            user (AuthFactory, $location) {
              return AuthFactory.getUser()
                .catch(() => $location.url('/login'))

            }
          }
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    // cache : false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl',
        // resolve: {
        //   user (AuthFactory, $location) {
        //     return AuthFactory.getUser()
        //       .catch(() => $location.url('/login'))
        //   }
        // }
      }
    }
  })

  .state('tab.bands', {
      // cache: false,
      url: '/bands',
      views: {
        'tab-messageboards': {
          templateUrl: 'templates/bands.html',
          controller: 'BandsCtrl',
          resolve: {
            bands (BandFactory) {
              const userId = firebase.auth().currentUser.uid
              return BandFactory.getBands(userId)
            }
          }
        }
      }
    })

    .state('tab.band-messages', {
      // cache : false,
      url: '/bands/:bandId',
      views: {
        'tab-messageboards': {
          templateUrl: 'templates/band-messages.html',
          controller: 'MessageBoardCtrl',
          resolve: {
            messages (MessageFactory, $stateParams) {
             return MessageFactory.getMessages($stateParams.bandId)
            }
          }
        }
      }
    })

  .state('tab.calenders', {
    // cache: false,
    url: '/calenders',
    views: {
      'tab-calenders': {
        templateUrl: 'templates/calenders.html',
        controller: 'CalenderCtrl',
        resolve: {
            bands (BandFactory) {
              const userId = firebase.auth().currentUser.uid
              return BandFactory.getBands(userId)
            }
        }
      }
    }
  })

  .state('tab.calender-detail', {
    // cache : false,
    url: '/calenders/:calenderId',
    views: {
      'tab-calenders': {
        templateUrl: 'templates/calender-detail.html',
        controller: 'CalenderDetailCtrl'
      }
    }
  })

  .state('tab.settings', {
    // cache : false,
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('tab.new-band', {
    // cache : false,
    url: '/settings/new-band',
    views: {
      'tab-settings': {
        templateUrl: 'templates/new-band.html',
        controller: 'NewBandCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
