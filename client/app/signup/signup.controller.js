angular.module('app')
.controller('SignupCtrl', function($scope, $auth) {
	$scope.signup = function() {
		$auth.signup({
			displayName: $scope.displayName,
			email: $scope.email,
			password: $scope.password
		}).catch(function(response) {
			$alert({
				content: response.data.message,
				animation: 'fadeZoomFadeDown',
				type: 'material',
				duration: 3
			});
		});
	};
});