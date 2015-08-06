'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:EmbedCtrl
 * @description
 * # EmbedCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('EmbedCtrl', function ($scope, gist, $location) {
      $scope.gist = gist;
      $scope.params = $location.search();

      $scope.svgIcon = $scope.gist.files['icon.svg'].content;
      console.log($scope.params, $scope.svgIcon)
      $scope.config = JSON.parse($scope.gist.files['config.json'].content);
      console.log($scope.gist)

      $scope.getNumber = function(num) {
        if(num){
          return new Array(Math.round(num));
        }
      }
  });
