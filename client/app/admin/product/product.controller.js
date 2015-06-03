function ProductAdminController ($scope, $resource){
	var Product = $resource('/api/products/:id');

	$scope.products = Product.query();
	$scope.deleteItem = function (index) {
        var product = $scope.products[index];
        console.log(product);
        Product.delete({ id : product._id });
        $scope.products.splice(index, 1);
    }
}

function AddProductAdminController ($scope, $resource) {
    var Product = $resource('/api/products/:id');
    $scope.product = new Product();

    $scope.addProduct = function() {
	Product.save($scope.product);
	window.location.href = "#/admin/products";
    }
}

function PutProductAdminController ($scope, $resource, $routeParams) {
    var Product = $resource('/api/products/:id',
	  {
	    id: '@_id'
	  },
	  {
	    update: {
	      method: 'PUT'
	    }
	  }
	);
    var productId = $routeParams.productId;

    $scope.product = Product.get({ id : productId });
    $scope.editProduct = function () {
        Product.update($scope.product);
	window.location.href = "#/admin/products";
    }
}


angular.module('app').controller('ProductAdminCtrl', ProductAdminController);
angular.module('app').controller('AddProductAdminCtrl', AddProductAdminController);
angular.module('app').controller('PutProductAdminCtrl', PutProductAdminController);
