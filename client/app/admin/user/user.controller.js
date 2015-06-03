function UserAdminController ($scope, $resource){
	var User = $resource('/api/users/:id');

	$scope.users = User.query();
	$scope.deleteItem = function (index) {
        var users = $scope.users[index];
        console.log(users);
        User.delete({ id : users._id });
        $scope.users.splice(index, 1);
    }
}

function NewUserAdminController($scope, $resource) {
	var User = $resource('/api/users/:id');
  	$scope.user = new User();
 
	  $scope.addUser = function() {
	  	User.save($scope.user);
	  	window.location.href = "#/admin/users";
	  };
}

function PutUserAdminController ($scope, $resource, $routeParams) {
    var User = $resource('/api/users/:id',
	  {
	    id: '@_id'
	  },
	  {
	    update: {
	      method: 'PUT'
	    }
	  }
	);
    var userId = $routeParams.userId;

    $scope.user = User.get({ id : userId });
    $scope.editUser = function () {
        //User.update($scope.user);
	//window.location.href = "#/admin/users";
    }
}

angular.module('app').controller('UserAdminCtrl', UserAdminController);
angular.module('app').controller('NewUserAdminCtrl', NewUserAdminController);
angular.module('app').controller('PutUserAdminCtrl', PutUserAdminController);