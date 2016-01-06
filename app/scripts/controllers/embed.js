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
      console.log(config, $scope.params)

      // $scope.svgIcon = svgIcon;

      $scope.getNumber = function(num) {
        console.log(num)
        if(num){
          return new Array(Math.round(num));
        }
      }
  });
