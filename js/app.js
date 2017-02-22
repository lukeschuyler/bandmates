 const config = {
    apiKey: "AIzaSyBV-JAYS7noyD20hpSEUbDnYnzxZ6Jm4WU",
    authDomain: "mush-e7c8f.firebaseapp.com",
    databaseURL: "https://mush-e7c8f.firebaseio.com",
    storageBucket: "mush-e7c8f.appspot.com",
    messagingSenderId: "934980040091"
  };
  firebase.initializeApp(config);

const bandmates = angular.module('bandmates', ['ionic', 'ui.rCalendar', 'ngCordova', "ion-datetime-picker", 'ion-autocomplete'])

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
      url: '/login',
      views: {
        'auth': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl',
          resolve: {
            user (AuthFactory, $location) {
              return AuthFactory.getUser()
                .then(function(user){
                    $location.url('/tab/dash')
                })
                .catch(() => $location.url('/auth/login'))
             }
          }
        }
      }
    })

    .state('auth.register', {
      url: '/register',
      views: {
        'auth': {
          templateUrl: 'templates/register.html',
          controller: 'LoginCtrl'
        }
      }
  })

    .state('tab', {
      cache: false,
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'NewBandCtrl',
      resolve: {
            user (AuthFactory, $location) {
              return AuthFactory.getUser()
                .catch(() => $location.url('/auth/login'))
            }
          }
  })

  .state('tab.dash', {
    cache : false,
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl',
        // resolve: {
        //   user (AuthFactory, $location) {
        //     return AuthFactory.getUser()
        //       .catch(() => $location.url('/auth/login'))
        //   }
        // }
      }
    }
  })

  .state('tab.bands', {
    // cache:false,
      url: '/bands',
      views: {
        'tab-messageboards': {
          templateUrl: 'templates/bands.html',
          controller: 'BandsCtrl'
        }
      }
    })

    .state('tab.band-messages', {
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
    // cache:false,
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
    cache : false,
    url: '/calenders/:calenderId',
    views: {
      'tab-calenders': {
        templateUrl: 'templates/calender-detail.html',
        controller: 'CalenderDetailCtrl'
      }
    }
  })

  .state('tab.music-notes', {
    url: '/musical-notes',
    views: {
      'tab-music': {
        templateUrl: 'templates/music-note.html',
        controller: 'MusicNoteCtrl'
      }
    }
  })

  .state('tab.music-notes-detail', {
    url: '/musical-notes/:project',
    views: {
      'tab-music': {
        templateUrl: 'templates/music-note-detail.html',
        controller: 'MusicNoteDetailCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');

});


bandmates.directive('headerShrink', function($document) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(max, amt);
    fadeAmt = 1 - amt / max;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var amt;

      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;

      var fadeAmt;
      
      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;
      
      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;

        if(scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
        } else {
          y = 0;
        }
        console.log(scrollTop);

        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;
          }
        });

        prevY = scrollTop;
      }

      $element.bind('scroll', onScroll);
    }
  }
})


bandmates.directive('imageonload', function() {
    return {
        restrict: 'A',
        scope: {
          ngShow : '='
        },
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(function(){
                    scope.ngShow = true;  
                });
            });
            element.bind('error', function(){
            });
        }
    };
});
