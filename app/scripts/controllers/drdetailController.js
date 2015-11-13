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
        var loadData = function(url, type, attr) {
            ajax.get(url).then(function(response) {
                var obj = eval('response.' + attr);
                if (obj.length == 0) $scope.end = true;
                Array.prototype.push.apply($scope.items, obj);
                $scope.page++;
                console.log($scope.page)
                if (type == "refresh") {
                    $scope.$broadcast('scroll.refreshComplete');
                } else if (type == "infinite") {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            });
        }
        var _initScopeVars = function(params) {
                for (var p in params) {
                    $scope[p] = params[p];
                }
            }
            //获取评论信息
        var loadComment = function(type) {
                var fetchSize = 5;
                var url = CONFIG.API.drcomment + '?userId=' + drId + '&offset=' + ($scope.page * fetchSize) + '&fetchSize=' + fetchSize;
                loadData(url, 'infinite', 'data.msg');
            }
            //获取我的推荐信息
        var loadRecomand = function(type) {
                var fetchSize = 5;
                var url = CONFIG.API.hotSell + '?userId=' + drId + '&offset=' + ($scope.page * fetchSize) + '&fetchSize=' + fetchSize;
                loadData(url, 'infinite', 'data.msg.data');
            }
            //点击comment页签
        if ($ionicTabsDelegate.selectedIndex() == 2) {
            _initScopeVars({
                items: [],
                end: false,
                page: 0
            });
            $scope.loadMore = function() {
                loadComment('infinite')
            }
            $scope.refresh = function() {
                _initScopeVars({
                    items: [],
                    end: false,
                    page: 0,
                })
                loadComment('refresh');
            }

        } else if ($ionicTabsDelegate.selectedIndex() == 0) {
            _initScopeVars({
                items: [],
                end: false,
                page: 0,
                imgWidth: $window.innerWidth
            });

            $scope.loadMore = function() {
                loadRecomand('infinite')
            };
            $scope.doRefresh = function() {
                _initScopeVars({
                    items: [],
                    end: false,
                    page: 0,
                })
                loadRecomand('refresh')
            };
        }
    });
