bandmates.controller('MusicNoteDetailCtrl', function($scope, ArchiveFactory, user, $stateParams, $sce) {

	$scope.explicitlyTrustedHtml;

	ProjectFactory.getProject($stateParams.project)
		.then((val) => {
			$scope.project = val
			$scope.explicitlyTrustedHtml = $sce.trustAsHtml(
		`<iframe src="${$scope.project.url}"></iframe>`)
		})  
})
