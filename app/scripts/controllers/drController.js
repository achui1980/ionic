'use strict';

/**
 * @ngdoc function
 * @name Ionic.controller:MainController
 * @description
 * # MainController
 */
angular.module('wineApp')
    .controller('DrController', function($window, $scope, ajax, CONFIG) {
        $scope.page = 0;
        $scope.end = false;
        //var ajaxUrl = CONFIG.API.daren + '?offset=0&fetchSize=6';
        $scope.resourceURL = CONFIG.getResourceURL();
        console.log(CONFIG.getResourceURL())
        $scope.imgWidth = ($window.innerWidth) * 0.46;
        var list = [];
        $scope.loadMoreItems = function() {
            var ajaxUrl = CONFIG.API.daren + '?offset=' + ($scope.page * 10) + '&fetchSize=10';
            ajax.get(ajaxUrl).then(function(response) {
            	console.log($scope.page);
            	//$scope.drList = (response.data.msg.data);
            	Array.prototype.push.apply(list, response.data.msg.data);
                $scope.drList = list ;
                $scope.page = $scope.page + 1;
                if(response.data.msg.data.length == 0) $scope.end = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.doRefresh = function(){
        	var list = [];
        	$scope.page = 0;
        	$scope.end = false;
        	var ajaxUrl = CONFIG.API.daren + '?offset=' + ($scope.page * 10) + '&fetchSize=10';
            ajax.get(ajaxUrl).then(function(response) {
            	console.log($scope.page);
            	$scope.drList = (response.data.msg.data);
            	Array.prototype.push.apply(list, response.data.msg.data);
                $scope.drList = list ;
                $scope.page = $scope.page + 1;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        /*var loadData = function(page,fetchSize){
        	var ajaxUrl = CONFIG.API.daren + '?offset=' + (page * 10) + '&fetchSize='+fetchSize;
            ajax.get(ajaxUrl).then(function(response) {
            	console.log(page);
            	$scope.drList = (response.data.msg.data);
            	Array.prototype.push.apply(list, response.data.msg.data);
                $scope.drList = list ;
                $scope.page = page + 1;
                $scope.$broadcast('scroll.refreshComplete');
            	$scope.$apply()
            });
        }*/
    });
