'use strict';

angular.module('wineApp.ajax', [])
    .factory('ajax', function($http, CONFIG) {
        var doAjax = function(url, method, param) {
            var fullUrl = CONFIG.getBaseApiURL() + url;
            console.log(fullUrl);
            var promise = $http({
                method: method,
                url: fullUrl,
                data: param
            });
            return promise;
        }
        var doGet = function(url,param){
        	return doAjax(url,'GET',{});
        }
        var doPost = function(url,method,param){
        	return doAjax(url,'POST',param);
        }

        return {
        	get:doGet,
        	post:doPost
        }
    })
