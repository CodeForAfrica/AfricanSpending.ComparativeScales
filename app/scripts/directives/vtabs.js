'use strict';

/**
 * @ngdoc directive
 * @name comparativescalesApp.directive:vtabs
 * @description
 * # vtabs
 */
angular.module('comparativescalesApp')
  .directive('vtabs', function () {
    return {
      templateUrl: 'views/vtabs.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if(scope.config){
          scope.total = scope.config.comparisons
        }else{
          scope.total = scope.comparisons.concat(scope.editorpicks).filter(function(d){return d.isSelected})
        }
        scope.tabActive = scope.total[0].id;
        scope.tabSwitch = function(id){
          scope.tabActive = id;
        }
      }
    };
  });
