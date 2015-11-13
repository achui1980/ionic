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
        var drId = $stateParams.drId;
        //获取达人信息
        var loadDrInfo = function(ajaxUrl) {
            ajax.get(ajaxUrl).then(function(response) {
                $scope.drInfo = response.data.msg;
                if ($scope.drInfo.height == '')
                    $scope.drInfo.height = '-';
                if ($scope.drInfo.weight == '')
                    $scope.drInfo.weight = '-';
            });
        }
        var loadDrLv = function(ajaxUrl) {
                //获取达人等级
                ajax.get(ajaxUrl).then(function(response) {
                    var lv = "images/lv/" + response.data.msg.name + '_' + response.data.msg.flag + 'lv' + response.data.msg.lv + ".png";
                    $scope.drLv = lv;
                });
            }
            //如果父级的controller已经调用了，就不在重复调用
        if (reloadDrInfo) {
            ajaxUrl = CONFIG.API.drinfo + '?userId=' + drId;
            loadDrInfo(ajaxUrl);
            ajaxUrl = CONFIG.API.drlv + '?userId=' + drId + '&type=2';
            loadDrLv(ajaxUrl);
        }
        var loadComment = function(type) {
                var fetchSize = 5;
                var url = CONFIG.API.drcomment + '?userId=' + drId + '&offset=' + ($scope.page * fetchSize) + '&fetchSize=' + fetchSize;
                //if($scope.end) return;
                ajax.get(url).then(function(response) {
                    if (response.data.msg.length == 0) $scope.end = true;
                    Array.prototype.push.apply($scope.comments, response.data.msg);
                    $scope.page++;
                    if(type == "refresh"){
                        $scope.$broadcast('scroll.refreshComplete');
                    }else if(type == "infinite"){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                });
            }
        var doRefresh = function(){
            $scope.comments = [];
            $scope.end = false;
            $scope.page = 0;
            loadComment('refresh');
            //$scope.$broadcast('scroll.refreshComplete');
        }
        var loadMore = function(){
            loadComment('infinite')
        }
            //点击comment页签
        if ($ionicTabsDelegate.selectedIndex() == 2) {
            $scope.comments = [];
            $scope.end = false;
            $scope.page = 0;
            $scope.loadMore = loadMore;
            $scope.doRefresh = doRefresh;
        }
    });
