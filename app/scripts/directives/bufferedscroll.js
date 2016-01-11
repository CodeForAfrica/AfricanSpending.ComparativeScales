'use strict';

/**
 * @ngdoc directive
 * @name comparativescalesApp.directive:bufferedScroll
 * @description
 * # bufferedScroll
 */
angular.module('comparativescalesApp')
  .directive('bufferedScroll', function ($parse) {
      return function ($scope, element, attrs) {
        var handler = $parse(attrs.bufferedScroll);
        element.scroll(function (evt) {
          var scrollTop    = element[0].scrollTop,
              scrollHeight = element[0].scrollHeight,
              offsetHeight = element[0].offsetHeight;
          if (scrollTop === (scrollHeight - offsetHeight)) {
            $scope.$apply(function () {
              handler($scope);
            });
          }
        });
      };
    });
