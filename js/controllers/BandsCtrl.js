bandmates.controller('BandsCtrl', function($scope, $location, BandFactory, bands, user) {
    $scope.user = user
    $scope.bandz = bands
})
