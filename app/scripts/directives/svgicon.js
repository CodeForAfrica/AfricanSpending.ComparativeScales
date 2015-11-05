'use strict';

/**
 * @ngdoc directive
 * @name comparativescalesApp.directive:svgIcon
 * @description
 * # svgIcon
 */
angular.module('comparativescalesApp')
  .directive('svgIcon', function () {
    return {
      restrict: 'A',
      scope: {
        comparison: '='
      },
      link: function postLink(scope, element, attrs) {
        var container = d3.select(element[0]);
        var index = attrs.index;
        var svg;
        if(scope.comparison.icon){
          container.empty()
          container.html(scope.comparison.icon)
          svg = container.select('svg')
          svg
            .attr("width", "100%")

          var credits = '';
          var texts = svg.selectAll('text')
            .each(function(d){
              credits = credits + " " + d3.select(this).text();
            })

          scope.comparison.credits = credits?credits:scope.comparison.credits

          texts.remove()

        }
        scope.$watch(function(scope){return scope.comparison.icon}, function (newValue, oldValue) {
          if(newValue != oldValue && newValue){
            scope.showImageButton = false;
            container.empty()
            container.html(newValue)
            svg = container.select('svg')
            svg.attr("width", "100%")

            var credits = '';

            var texts = svg.selectAll('text')
              .each(function(d){
                credits = credits + " " + d3.select(this).text();
              })

            scope.comparison.credits = credits?credits:scope.comparison.credits

            texts.remove()
          }
        });
      }
    };
  });
