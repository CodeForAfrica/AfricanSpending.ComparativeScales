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
      $scope.boxheight = $scope.params.boxheight;
      $scope.iconSize = $scope.params.size;
      $scope.limit = 100
      $scope.increaseLimit = function () {
        //if ($scope.limit < $scope.items.length) {
          $scope.limit += 100;

        //}
      };
      $scope.getNumber = function(num, itemsNumber) {
        if(itemsNumber){
          return new Array(itemsNumber);
        }else if(num){
          return new Array(Math.round(num));
        }
      }
  });
