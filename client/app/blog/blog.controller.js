function BlogController ($scope, Feed){
	$scope.name = 'BLOG';
    $scope.init=function(){        
        Feed.parseFeed('http://www.mon-cafe.fr/rss.php?type=blog').then(function(res){
            $scope.feeds=res.data.responseData.feed.entries;
        });
    }
}

angular.module('app').controller('BlogCtrl', ['$scope','FeedService', BlogController]);

angular.module('app').factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);