
function ProductController ($scope, $resource){

	var Product = $resource('/api/products/:id');

	$scope.products = Product.query();
}

angular.module('app').controller('ProductCtrl', ProductController);