function ProductDetailController($scope, $resource, $routeParams) {

    var productId = $routeParams.productId;

    var Product = $resource('/api/products/:id');

    $scope.product = Product.get({ id : productId });
}

angular.module('app').controller('ProductDetailCtrl', ProductDetailController);