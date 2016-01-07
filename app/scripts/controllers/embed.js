'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:EmbedCtrl
 * @description
 * # EmbedCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('EmbedCtrl', function ($scope, config, $location) {

      $scope.config = config;
      $scope.params = $location.search();

      $scope.getNumber = function(num) {
        if(num){
          return new Array(Math.round(num));
        }
      }
  });
