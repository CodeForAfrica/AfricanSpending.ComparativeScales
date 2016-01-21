'use strict';

/**
 * @ngdoc directive
 * @name comparativescalesApp.directive:modelwatch
 * @description
 * # modelwatch
 */
angular.module('comparativescalesApp')
  .directive('modelwatch', function () {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
           scope.$watch(function () {
              return ngModel.$modelValue;
           }, function(newValue) {
               scope.emb[attrs.ngModel] = newValue;
               scope.updateEmbedCode()
           });
        }
     };
});
