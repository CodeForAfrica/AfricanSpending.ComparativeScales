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
      }
    };
  });
