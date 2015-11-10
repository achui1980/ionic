'use strict';

/**
 * @ngdoc overview
 * @name Ionic
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('wineApp', ['ionic', 'ngCordova', 'ngResource', 'wineApp.ajax', 'config'])

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

.config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    var backText = "Back2";


    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                console.log('sending request ... ...');
                $rootScope.$broadcast('loading:show');
                return config
            },
            response: function(response) {
                console.log('receive response ... ...');
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
        .state('daren-detail', {
            url: '/daren-detail/:drId',
            abstract:true,
            templateUrl: 'templates/daren-detail-tab.html',
            controller: 'DrdetailController',
           /* views: {
                'tab-daren': {
                    templateUrl: 'templates/tab-daren-detail.html',
                    controller: 'DrdetailController'
                }
            }*/
        })
        .state('daren-detail.main', {
            url: '/main',
            views: {
                'detail-main': {
                    templateUrl: 'templates/daren-detail-main.html',
                    controller: 'DrdetailController'
                }
            }
        })
        .state('daren-detail.info', {
            url: '/info',
            views: {
                'detail-info': {
                    templateUrl: 'templates/daren-detail-info.html',
                    controller: 'DrdetailController'
                }
            }
        })
        .state('daren-detail.comment', {
            url: '/comment',
            views: {
                'detail-comment': {
                    templateUrl: 'templates/daren-detail-comment.html',
                    controller: 'DrdetailController'
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
        .state('my', {
            url: '/my',
            abstract:true,
            templateUrl: 'templates/tab-my.html',
            controller: 'MyController'
        })
        .state('my.page1', {
            url: "/page1",
            views: {
                'my-page1': {
                    templateUrl: "templates/tab-my-1.html"
                }
            }
        })
        .state('my.page2', {
            url: "/page2",
            views: {
                'my-page2': {
                    templateUrl: "templates/tab-my-2.html"
                }
            }
        });



    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/tab/home');
});
