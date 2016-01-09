'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:IconmodalCtrl
 * @description
 * # IconmodalCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('IconmodalCtrl', function ($scope, $uibModalInstance,$timeout, Upload, comparison, bignumber, selUnit) {
    $scope.bignumber = bignumber;
    $scope.selUnit = selUnit;
    var elm = {
      objDescription: '',
      source: '',
      credits: '',
      itemsNumber: '',
      objvalue: '',
      icon: '',
      isSelected: false,
      isActive:false
    }

    $scope.comparison = comparison?comparison:elm;

    $scope.ok = function () {
      $uibModalInstance.close($scope.comparison);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var reader = new FileReader();
					reader.onload = function(e) {
						var text = reader.result;
            $timeout(function(){
            $scope.comparison.icon = text;
            })

			    };

					reader.readAsText(file);
            }
        }
    };

  });
