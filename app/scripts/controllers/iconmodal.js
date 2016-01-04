'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:IconmodalCtrl
 * @description
 * # IconmodalCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('IconmodalCtrl', function ($scope, $uibModalInstance,$timeout, Upload) {
    $scope.comparison = {};
    $scope.ok = function () {
      $uibModalInstance.close();
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
