'use strict';

/**
 * @ngdoc function
 * @name Ionic.controller:MainController
 * @description
 * # MainController
 */
angular.module('wineApp')
    .controller('WinedetailController', function($window, $scope, ajax, CONFIG, $location, $stateParams, $ionicTabsDelegate) {
        var ajaxUrl = "";
        $scope.resourceURL = CONFIG.getResourceURL();
        var reloadDrInfo = $scope.drInfo == null ? true : false;
        var wineId = $stateParams.wineId;
        
    });
