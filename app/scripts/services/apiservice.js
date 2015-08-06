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
      }
    };
  });
