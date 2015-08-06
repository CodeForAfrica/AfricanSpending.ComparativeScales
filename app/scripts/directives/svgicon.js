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
      link: function postLink(scope, element, attrs) {
        var container = d3.select(element[0]);
        if(scope.svgIcon){
          container.empty()
          container.html(scope.svgIcon)
          container.select('svg')
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", function(){
              if(attrs.iconstyle){
                return "black";
              }else{
                return "white";
              }
            })
        }
        scope.$watch('svgIcon', function (newValue, oldValue) {
          if(newValue != oldValue && newValue){
            scope.showImageButton = false;
            container.empty()
            container.html(newValue)
            container.select('svg')
              .attr("width", "100%")
              .attr("height", "100%")
              .attr("fill", function(){
                if(attrs.iconstyle){
                  return "black";
                }else{
                  return "white";
                }
              })
          }
        });
      }
    };
  });
