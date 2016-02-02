'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('NavbarCtrl', function ($scope,$location) {
    $scope.show = true;
    $scope.$on('$locationChangeSuccess', function(event, current) {
      var path = $location.path();
      if(path != '/embed'){
        $scope.show = true;
      }else{
        $scope.show = false;
      }
    });
  });
