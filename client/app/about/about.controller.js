function AboutController ($scope, $resource){
	$scope.name = 'ABOUT';

	//var Job = $resource('/api/jobs/:id');

	//$scope.jobs = Job.query();
}

angular.module('app').controller('AboutCtrl', AboutController);