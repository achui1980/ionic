'use strict';

/**
 * @ngdoc function
 * @name Ionic.controller:MainController
 * @description
 * # MainController
 */
angular.module('wineApp')
    .controller('WineController', function($window,$scope,ajax,CONFIG) {
        $scope.page = 0;
        $scope.end = false;
        $scope.resourceURL = CONFIG.getResourceURL();
        $scope.imgWidth = ($window.innerWidth) * 0.46;
        $scope.itemList = [];

        var fetchSize = 10;
        var ajaxUrl = CONFIG.API.wine + '?offset=' + ($scope.page * fetchSize) + '&fetchSize=' + fetchSize;
        $scope.loadMoreItems = function() {
            ajax.get(ajaxUrl).then(function(response) {
                console.log($scope.page);
                Array.prototype.push.apply($scope.itemList, response.data.msg.data);
                $scope.page = $scope.page + 1;
                if (response.data.msg.data.length == 0) $scope.end = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.doRefresh = function() {
            $scope.page = 0;
            $scope.end = false;
            $scope.itemList = [];
            ajax.get(ajaxUrl).then(function(response) {
                console.log($scope.page);
                Array.prototype.push.apply($scope.itemList, response.data.msg.data);
                $scope.page = $scope.page + 1;
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

    });
