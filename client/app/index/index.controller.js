function IndexController ($scope, $resource){
	$scope.name = 'INDEX';

	var Product = $resource('/api/products/:id');

	$scope.products = Product.query();
}

angular.module('app').controller('IndexCtrl', IndexController);