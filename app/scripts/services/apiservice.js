'use strict';

/**
 * @ngdoc service
 * @name comparativescalesApp.apiservice
 * @description
 * # apiservice
 * Factory in the comparativescalesApp.
 */
angular.module('comparativescalesApp')
  .factory('apiservice', function ($q,$http) {

    var baseUrl = 'https://api.github.com/gists/';
    var baseUrlRaw = 'https://gist.githubusercontent.com/anonymous/';

    return {
      getGist: function (id) {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url : baseUrl + id
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching gist");
        });

        return deferred.promise;
      },
      getGistFile: function (id, version, file) {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url : baseUrlRaw + id + '/raw/' + version + '/' + file
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching gist");
        });

        return deferred.promise;
      },
      getCurrenciesList: function () {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url : 'https://openexchangerates.org/api/currencies.json'
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching currencies");
        });

        return deferred.promise;
      },
      getCurrenciesRates: function () {
        var deferred = $q.defer();
        // $http({
        //   method: 'GET',
        //   url : 'https://openexchangerates.org/api/latest.json',
        //   params:{
        //       'app_id': '31beaa8ba1c14720bd5a8734b937069f'
        //     }
        $http({
          method: 'GET',
          url : 'data/rates.json'
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching currencies rates");
        });

        return deferred.promise;
      },
      getFile: function (url) {
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url : url
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching file");
        });

        return deferred.promise;
      },
    };
  });
