bandmates.controller('BandsCtrl', function($scope, $location, BandFactory, bands, user) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  
  $scope.$on('$ionicView.enter', function(e) {
    $scope.user = user
    $scope.bandz = bands
    console.log(bands)
  });

    $scope.bandz = bands
  // BandFactory.getBands().then(function(val) {
  //   $scope.bands = val
  //   console.log($scope.bands)
  // })

})
