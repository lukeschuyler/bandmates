bandmates.controller('NewBandCtrl', function($scope, NewBandFactory, user, $ionicModal, AuthFactory, $location) {



  $scope.registerView = false;

	$scope.$on("$ionicView.enter", function () {
		$scope.user = user
    });

  $scope.toggleRegister = function() {
    $scope.registerView = !$scope.registerView
  }

	$scope.registerBand = function() {
    NewBandFactory.registerBand()
    // $location.url('/tab/dash')
    $state.reload()
  } 

	$scope.joinBand = function() {
    NewBandFactory.joinBand
    $state.reload()
  }

    $ionicModal.fromTemplateUrl('templates/new-band.html', {
      id: '1', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    // Modal 2
    $ionicModal.fromTemplateUrl('templates/settings.html', {
      id: '2', // We need to use and ID to identify the modal that is firing the event!
      scope: $scope,
      backdropClickToClose: false,
      animation: 'slide-in-right'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };

    /* Listen for broadcasted messages */

    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });

    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });

    // Cleanup the modals when we're done with them (i.e: state change)
    // Angular will broadcast a $destroy event just before tearing down a scope 
    // and removing the scope from its parent.
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });
 
	$scope.logout = function(){
		AuthFactory.logout()
			.then(function() {
				$location.url('/auth/login')
			})
			.catch(function(){
				console.log('toast')
			})
	}

})
