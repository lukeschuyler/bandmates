bandmates.controller('BandsCtrl', function($scope, $location, BandFactory, bands, user) {
  
  $scope.$on('$ionicView.enter', function(e) {
    $scope.user = user
    $scope.bandz = bands
    console.log(bands)
  });

    $scope.bandz = bands

})
