'use strict';

angular.module('wineApp.ajax', [])
    .factory('Ajax', function($http, CONFIG) {
        var doAjax = function(url, method, param) {
        	console.log(fullUrl);
            var fullUrl = CONFIG.getBaseApiURL() + url;
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
