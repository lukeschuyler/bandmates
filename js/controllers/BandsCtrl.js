bandmates.controller('BandsCtrl', function($scope, $location, BandFactory, user) {

  $scope.user = user

   BandFactory.getBands(user.uid)
    .then(function(val){
      $scope.bandz = val
      // $scope.$apply()
    })
})
