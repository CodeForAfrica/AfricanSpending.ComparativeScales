'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:EmbedCtrl
 * @description
 * # EmbedCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('EmbedCtrl', function ($scope, config, svgIcon, $location) {
      console.log(config, svgIcon)
      $scope.config = config;
      $scope.params = $location.search();

      $scope.svgIcon = svgIcon;

      $scope.getNumber = function(num) {
        if(num){
          return new Array(Math.round(num));
        }
      }
  });
