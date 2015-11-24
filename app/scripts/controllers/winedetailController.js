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
        var reload = $scope.wine == null ? true : false;
        var wineId = $stateParams.wineId;
        $scope.imgWidth = $window.innerWidth;
        $scope.wineNum = 1;
        var ajaxUrl = CONFIG.API.winedetail + '?id=' + wineId;

        var loadWineInfo = function(){
        	 ajax.get(ajaxUrl).then(function(response) {
                $scope.wine = response.data.msg.wine;
                $scope.jzInfo = response.data.msg.merchant;
                $scope.card = response.data.msg.card;
                $scope.rate = response.data.msg.rate;
            });
        }
        if(reload){
        	loadWineInfo();
        }

        var calWineNum = function(type){
        	if(type == 'plus'){
        		$scope.wineNum++;
        	}else if(type == 'minus'){
        		$scope.wineNum--;
        		if($scope.wineNum < 1){
        			$scope.wineNum = 1
        		}
        	}
        }

        $scope.calWineNum = calWineNum;
    });
