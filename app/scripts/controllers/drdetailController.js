'use strict';

/**
 * @ngdoc function
 * @name Ionic.controller:MainController
 * @description
 * # MainController
 */
angular.module('wineApp')
    .controller('DrdetailController', function($window, $scope, ajax, CONFIG, $location, $stateParams, $ionicNavBarDelegate) {
        var drId = $stateParams.drId;
        console.log('drId:'+drId);
        var ajaxUrl = CONFIG.API.drinfo + '?userId=' + drId;
        $scope.resourceURL = CONFIG.getResourceURL();
        //$scope.drBean = {};
        ajax.get(ajaxUrl).then(function(response) {
            $scope.drInfo = response.data.msg;
            if ($scope.drInfo.height == '')
                $scope.drInfo.height = '-';
            if ($scope.drInfo.weight == '')
                $scope.drInfo.weight = '-';
        });

    });
