 const config = {
    apiKey: "AIzaSyBV-JAYS7noyD20hpSEUbDnYnzxZ6Jm4WU",
    authDomain: "mush-e7c8f.firebaseapp.com",
    databaseURL: "https://mush-e7c8f.firebaseio.com",
    storageBucket: "mush-e7c8f.appspot.com",
    messagingSenderId: "934980040091"
  };
  firebase.initializeApp(config);

const bandmates = angular.module('bandmates', ['ionic', 'ui.rCalendar', 'ngCordova'])

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

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    cache : false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl',
        resolve: {
          user (AuthFactory, $location) {
            return AuthFactory.getUser().catch(() => $location.url('/tab/settings'))
          }
        }
      }
    }
  })

  .state('tab.bands', {
      cache: false,
      url: '/bands',
      views: {
        'tab-messageboards': {
          templateUrl: 'templates/bands.html',
          controller: 'BandsCtrl',
          resolve: {
            user (AuthFactory, $location) {
              return AuthFactory.getUser().catch(() => $location.url('/tab/settings'))
            },
            bands (BandFactory) {
              const userId = firebase.auth().currentUser.uid
              return BandFactory.getBands(userId)
            }
          }
        }
      }
    })

    .state('tab.band-messages', {
      cache : false,
      url: '/bands/:bandId',
      views: {
        'tab-messageboards': {
          templateUrl: 'templates/band-messages.html',
          controller: 'MessageBoardCtrl',
          resolve: {
            user (AuthFactory, $location) {
              return AuthFactory.getUser().catch(() => $location.url('/tab/settings'))
            },
            messages (MessageFactory, $stateParams) {
             return MessageFactory.getMessages($stateParams.bandId)
            }
          }
        }
      }
    })

  .state('tab.calenders', {
    cache: false,
    url: '/calenders',
    views: {
      'tab-calenders': {
        templateUrl: 'templates/calenders.html',
        controller: 'CalenderCtrl'
      }
    }
  })

  .state('tab.calender-detail', {
    cache : false,
    url: '/calenders/:calenderId',
    views: {
      'tab-calenders': {
        templateUrl: 'templates/calender-detail.html',
        controller: 'CalenderDetailCtrl'
      }
    }
  })

  .state('tab.settings', {
    cache : false,
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          user (AuthFactory, $location) {
            return AuthFactory.getUser().catch(function() {
              // $location.url('tab/settings')
            })
          }
        }
      }
    }
  })

  .state('tab.login', {
    cache : false,
    url: '/settings/login',
    views: {
      'tab-settings': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        resolve: {
          user (AuthFactory, $location) {
            return AuthFactory.getUser().catch(function() {
              // some kind of toast saying to try again
              // $location.url('tab/settings')
            })
          }
        }
      }
    }
  })

  .state('tab.register', {
    cache : false,
    url: '/settings/register',
    views: {
      'tab-settings': {
        templateUrl: 'templates/register.html',
        controller: 'LoginCtrl',
        resolve: {
          user (AuthFactory, $location) {
            return AuthFactory.getUser().catch(function() {
              // some kind of toast saying to try again
            })
          }
        }
      }
    }
  })

  .state('tab.new-band', {
    cache : false,
    url: '/settings/new-band',
    views: {
      'tab-settings': {
        templateUrl: 'templates/new-band.html',
        controller: 'NewBandCtrl',
        resolve: {
          user (AuthFactory, $location) {
            return AuthFactory.getUser().catch(function() {
              // some kind of toast saying to try again
            })
          }
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
