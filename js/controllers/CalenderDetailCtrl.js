bandmates.controller('CalenderDetailCtrl', function($scope, CalFactory, $stateParams, BandFactory, user) {
    $scope.calendar = {};
	$scope.band = $stateParams.calenderId

    if ($scope.band === 'all') {
        CalFactory.getAllEvents()
            .then(function(val) {
                $scope.events = Object.keys(val).map(function(key) {
                    return val[key]
                })
            })        
    } else {
        CalFactory.getEvents($scope.band)
        .then(function(val) {
            $scope.events = Object.keys(val).map(function(key) {
                return val[key]
            })
        })
    }

        $scope.changeMode = function (mode) {
            $scope.calendar.mode = mode;
        };

        $scope.onEventSelected = function (event) {

        };

        $scope.onViewTitleChanged = function (title) {
            $scope.viewTitle = title;
        };

        $scope.today = function () {
            $scope.calendar.currentDate = new Date();
        };

        $scope.isToday = function () {
            var today = new Date(),
            currentCalendarDate = new Date($scope.calendar.currentDate);
            today.setHours(0, 0, 0, 0);
            currentCalendarDate.setHours(0, 0, 0, 0);
            return today.getTime() === currentCalendarDate.getTime();
        };

        $scope.onTimeSelected = function (selectedTime, events, disabled) {

        };

})
