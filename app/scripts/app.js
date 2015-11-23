'use strict';

/**
 * @ngdoc overview
 * @name Ionic
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('wineApp', ['ionic', 'ngCordova', 'ngResource', 'wineApp.ajax', 'config', 'LocalStorageModule'])

.run(function($ionicPlatform, $rootScope, $ionicLoading) {

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            })
        });

        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide()
        });

        $ionicPlatform.ready(function() {
            // save to use plugins here
        });

        // add possible global event handlers here

    })
    .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('wineApp');
    }])
    .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        var backText = "Back2";


        $httpProvider.interceptors.push(function($rootScope) {
            return {
                request: function(config) {
                    $rootScope.$broadcast('loading:show');
                    return config
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide');
                    return response
                }
            }
        })
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.backButton.previousTitleText(false).text('').icon('ion-ios-arrow-back');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        // $ionicConfigProvider.platform.ios.backButton.text('').previousTitleText(false).icon('ion-chevron-left');
        // $ionicConfigProvider.platform.android.backButton.text('').previousTitleText(false).icon('ion-android-arrow-back');

        //$ionicConfigProvider.platform.ios.backButton.text('2222').icon('ion-chevron-left');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        //$ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');

        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');

        // Application routing

        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.home', {
                url: '/home',
                views: {
                    'tab-home': {
                        templateUrl: 'templates/tab-home.html',
                        controller: 'HomeController'
                    }
                }
            })
            .state('tab.daren', {
                url: '/daren',
                views: {
                    'tab-daren': {
                        templateUrl: 'templates/tab-daren.html',
                        controller: 'DrController'
                    }
                }
            })
            //达人模块路由
            .state('daren-detail', {
                url: '/daren-detail/:drId',
                cache: false,
                abstract: true,
                templateUrl: 'templates/dr/daren-detail-tab.html',
                controller: 'DrdetailController'
                    /* views: {
                         'tab-daren': {
                             templateUrl: 'templates/tab-daren-detail.html',
                             controller: 'DrdetailController'
                         }
                     }*/
            })
            .state('daren-detail.main', {
                url: '/main',
                //cache: false,
                views: {
                    'detail-main': {
                        templateUrl: 'templates/dr/daren-detail-main.html',
                        controller: 'DrdetailController'
                    }
                }
            })
            .state('daren-detail.info', {
                url: '/info',
                //cache: false,
                views: {
                    'detail-info': {
                        templateUrl: 'templates/dr/daren-detail-info.html',
                        controller: 'DrdetailController'
                    }
                }
            })
            .state('daren-detail.comment', {
                url: '/comment',
                //cache: false,
                views: {
                    'detail-comment': {
                        templateUrl: 'templates/dr/daren-detail-comment.html',
                        controller: 'DrdetailController'
                    }
                }
            })
            //酒庄模块路由
            .state('wine-detail', {
                url: '/wine-detail/:wineId',
                cache: false,
                abstract: true,
                templateUrl: 'templates/wine/wine-detail-tab.html',
                controller: 'WinedetailController'
            })
            .state('wine-detail.main', {
                url: '/main',
                //cache: false,
                views: {
                    'detail-main': {
                        templateUrl: 'templates/wine/wine-detail-main.html',
                        controller: 'WinedetailController'
                    }
                }
            })
            .state('wine-detail.info', {
                url: '/info',
                //cache: false,
                views: {
                    'detail-info': {
                        templateUrl: 'templates/wine/wine-detail-info.html',
                        controller: 'WinedetailController'
                    }
                }
            })
            .state('wine-detail.intro', {
                url: '/intro',
                //cache: false,
                views: {
                    'detail-intro': {
                        templateUrl: 'templates/wine/wine-detail-intro.html',
                        controller: 'WinedetailController'
                    }
                }
            })
            .state('tab.shop', {
                url: '/shop',
                views: {
                    'tab-shop': {
                        templateUrl: 'templates/tab-shop.html',
                        controller: 'ShopController'
                    }
                }
            })
            .state('tab.wine', {
                url: '/wine',
                views: {
                    'tab-wine': {
                        templateUrl: 'templates/tab-wine.html',
                        controller: 'WineController'
                    }
                }
            })
            .state('tab.my', {
                url: '/my',
                views: {
                    'tab-my': {
                        templateUrl: 'templates/tab-my.html',
                        controller: 'MyController'
                    }
                }

            })
            // redirects to default route for undefined routes
        $urlRouterProvider.otherwise('/tab/home');
    });
