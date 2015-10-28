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

.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
        // save to use plugins here
    });

    // add possible global event handlers here

})

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
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
            cache: true,
            views: {
                'viewContent': {
                    templateUrl: 'templates/views/home.html',
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
        });



    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/tab/home');
});
