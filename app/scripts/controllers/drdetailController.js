'use strict';

/**
 * @ngdoc function
 * @name Ionic.controller:MainController
 * @description
 * # MainController
 */
angular.module('wineApp')
    .controller('DrdetailController', function($window, $scope, ajax, CONFIG, $location, $stateParams, $ionicTabsDelegate) {
        var ajaxUrl = "";
        $scope.resourceURL = CONFIG.getResourceURL();
        var reloadDrInfo = $scope.drInfo == null ? true : false;
        //获取达人信息
        var loadDrInfo = function(ajaxUrl){
            ajax.get(ajaxUrl).then(function(response) {
                $scope.drInfo = response.data.msg;
                if ($scope.drInfo.height == '')
                    $scope.drInfo.height = '-';
                if ($scope.drInfo.weight == '')
                    $scope.drInfo.weight = '-';
            });
        }
        var loadDrLv = function(ajaxUrl){
            //获取达人等级
            ajax.get(ajaxUrl).then(function(response) {
                var lv = "images/lv/" + response.data.msg.name + '_' + response.data.msg.flag + 'lv' + response.data.msg.lv + ".png";
                $scope.drLv = lv;
            });
        }
        //如果父级的controller已经调用了，就不在重复调用
        if (reloadDrInfo) {
            ajaxUrl = CONFIG.API.drinfo + '?userId=' + $stateParams.drId;
            loadDrInfo(ajaxUrl);
            ajaxUrl = CONFIG.API.drlv + '?userId=' + $stateParams.drId + '&type=2';
            loadDrLv(ajaxUrl);
        }
    });
