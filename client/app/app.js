var module = angular.module('app', ['ngResource', 'ngRoute', 'satellizer', 'ngMessages', 'ngAnimate', 'mgcrea.ngStrap']);

function RouteConfig ($routeProvider, $authProvider){

	$routeProvider
	.when('/product', {
		templateUrl : 'app/product/product-list.html',
		controller : 'ProductCtrl'
	}).when('/product/:productId', {
		templateUrl : 'app/product/product-read.html',
		controller : 'ProductDetailCtrl'
	}).when('/about', {
		templateUrl : 'app/about/about.html',
		controller : 'AboutCtrl'
	}).when('/blogs', {
		templateUrl : 'app/blog/blog.html',
		controller : 'BlogCtrl'
	}).when('/login', {
		templateUrl : 'app/login/login.html',
		controller : 'LoginCtrl'
	}).when('/signup', {
		templateUrl : 'app/signup/signup.html',
		controller : 'SignupCtrl'
	}).when('/logout', {
		template: null,
		controller: 'LogoutCtrl'
	}).when('/profile', {
		templateUrl : 'app/user/profile.html',
		controller : 'UserCtrl',
		resolve: {
			authenticated: function($q, $location, $auth) {
				var deferred = $q.defer();
				if (!$auth.isAuthenticated()) {
					$location.path('/login');
				} else {
					deferred.resolve();
				}
				return deferred.promise;
			}
		}
	}).when('/admin/products', {
		templateUrl : 'app/admin/product/products.html',
		controller : 'ProductAdminCtrl',
		resolve: {
			authenticated: function($q, $location, $auth) {
				var deferred = $q.defer();
				if (!$auth.isAuthenticated()) {
					$location.path('/login');
				} else {
					deferred.resolve();
				}
				return deferred.promise;
			}
		}
	}).when('/admin/products/new', {
		templateUrl : 'app/admin/product/products-add.html',
		controller : 'AddProductAdminCtrl',
		resolve: {
			authenticated: function($q, $location, $auth) {
				var deferred = $q.defer();
				if (!$auth.isAuthenticated()) {
					$location.path('/login');
				} else {
					deferred.resolve();
				}
				return deferred.promise;
			}
		}
	}).when('/admin/products/edit/:productId', {
	    templateUrl : 'app/admin/product/products-edit.html',
	    controller : 'PutProductAdminCtrl',
	    resolve: {
		authenticated: function($q, $location, $auth) {
		    var deferred = $q.defer();
				if (!$auth.isAuthenticated()) {
				    $location.path('/login');
				} else {
				    deferred.resolve();
				}
		    return deferred.promise;
		}
	    }
	}).when('/admin/users', {
		templateUrl : 'app/admin/user/users.html',
		controller : 'UserAdminCtrl',
		resolve: {
			authenticated: function($q, $location, $auth) {
				var deferred = $q.defer();
				if (!$auth.isAuthenticated()) {
					$location.path('/login');
				} else {
					deferred.resolve();
				}
				return deferred.promise;
			}
		}
	}).when('/admin/users/new', {
		templateUrl : 'app/admin/user/user-add.html',
		controller : 'NewUserAdminCtrl',
		resolve: {
			authenticated: function($q, $location, $auth) {
				var deferred = $q.defer();
				if (!$auth.isAuthenticated()) {
					$location.path('/login');
				} else {
					deferred.resolve();
				}
				return deferred.promise;
			}
		}
	}).when('/admin/users/edit/:userId', {
	    templateUrl : 'app/admin/user/user-edit.html',
	    controller : 'PutUserAdminCtrl',
	    resolve: {
		authenticated: function($q, $location, $auth) {
		    var deferred = $q.defer();
		    if (!$auth.isAuthenticated()) {
			$location.path('/login');
		    } else {
			deferred.resolve();
		    }
		    return deferred.promise;
		}
	    }
	}).when('/admin', {
		templateUrl : 'app/admin/admin.html',
		controller : 'AdminCtrl',
		resolve: {
			authenticated: function($q, $location, $auth) {
				var deferred = $q.defer();
				if (!$auth.isAuthenticated()) {
					$location.path('/login');
				} else {
					deferred.resolve();
				}
				return deferred.promise;
			}
		}
	}).when('/', {
		templateUrl : 'app/index/index.html',
		controller : 'IndexCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
	//$routeProvider.otherwise('/jobs');
}

angular.module('app').config(RouteConfig);

angular.module('app')
.config(['$httpProvider', function ($httpProvider) {
        // ...

        // delete header from client:
        // http://stackoverflow.com/questions/17289195/angularjs-post-data-to-external-rest-api
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);
