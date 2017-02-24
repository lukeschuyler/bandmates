bandmates.controller('CalenderDetailCtrl', function($scope, CalFactory, $stateParams, BandFactory, user) {
    $scope.calendar = {};
	$scope.band = $stateParams.calenderId
    // if ($scope.band === 'all') {
    //     BandFactory.getBands(user.uid)
    //         .then(function(val){
    //             $scope.bandz = Object.keys(val).map(function(key) {
    //                 return val[key]
    //             })
    //         })
    //         .then(function() {
    //             for (let i = 0; i < $scope.bandz.length; i++) {
    //                 CalFactory.getEvents($scope.bandz[i].bandName)
    //                     .then(function(val) {
    //                         let currentBandArray = Object.keys(val).map(function(key) {
    //                             return val[key]
    //                     })
    //                     $scope.events = []
    //                     for (let j = 0; j < currentBandArray.length; j++) {
    //                         $scope.events.push(currentBandArray[j])
    //                     }
    //                 })
    //             }
    //         })

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

        $scope.loadEvents = function () {
            $scope.calendar.eventSource = createRandomEvents();
        };

        $scope.onEventSelected = function (event) {
            console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
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
