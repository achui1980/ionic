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
        var fetchSize = 10;
        $scope.end = false;
        $scope.resourceURL = CONFIG.getResourceURL();
        console.log(CONFIG.getResourceURL())
        $scope.imgWidth = ($window.innerWidth) * 0.46;
        $scope.drList = [];
        $scope.loadMoreItems = function() {
            var ajaxUrl = CONFIG.API.daren + '?offset=' + ($scope.page * fetchSize) + '&fetchSize='+fetchSize;
            ajax.get(ajaxUrl).then(function(response) {
            	console.log($scope.page);
            	Array.prototype.push.apply($scope.drList, response.data.msg.data);
                $scope.page = $scope.page + 1;
                if(response.data.msg.data.length == 0) $scope.end = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.doRefresh = function(){
        	$scope.page = 0;
        	$scope.end = false;
            $scope.drList = [];
            //loadData($scope.page,10,'refresh');
        	var ajaxUrl = CONFIG.API.daren + '?offset=' + ($scope.page * fetchSize) + '&fetchSize='+fetchSize;
            ajax.get(ajaxUrl).then(function(response) {
            	console.log($scope.page);
            	Array.prototype.push.apply($scope.drList, response.data.msg.data);
                $scope.page = $scope.page + 1;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        /*var loadData = function(page,fetchSize,loadType){
        	var ajaxUrl = CONFIG.API.daren + '?offset=' + (page * fetchSize) + '&fetchSize='+fetchSize;
            ajax.get(ajaxUrl).then(function(response) {
            	console.log(page);
            	//$scope.drList = (response.data.msg.data);
            	Array.prototype.push.apply($scope.drList, response.data.msg.data);
                //$scope.drList = list ;
                $scope.page = page + 1;
                if(loadType == 'infinite' && response.data.msg.data.length == 0){
                    $scope.end = true;
                }
                console.log($scope.end);
                if(loadType != null){
                    var loadEvent = 'scroll.'+loadType+'Complete'
                    $scope.$broadcast(loadEvent);
                }
            });
        }*/

    });
