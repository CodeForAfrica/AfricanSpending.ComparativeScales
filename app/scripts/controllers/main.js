'use strict';

/**
 * @ngdoc function
 * @name comparativescalesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the comparativescalesApp
 */
angular.module('comparativescalesApp')
  .controller('MainCtrl', function ($scope, $timeout, Upload) {
    $scope.bignumber;
    $scope.description;
    $scope.units = ['USD', 'ZAR'];
    $scope.selUnit = $scope.units[0];
    $scope.showComparison = false;
    $scope.showImage = false;
    $scope.showImageButton = true;
    $scope.icon;


    $scope.addComparison = function(){
      $scope.showComparison = true;
    }

    $scope.addImage = function(){
      $scope.showImage = true;
    }

    $scope.$watch('icon', function (newValue, oldValue) {
      if(newValue != oldValue && newValue){
        $scope.upload([$scope.icon]);
      }
    });

    $scope.svgIcon

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //console.log(file)

                var reader = new FileReader();

					reader.onload = function(e) {
						var text = reader.result;
            console.log("yo", text)
            $timeout(function(){
              $scope.svgIcon = text;
            })

			    };

					reader.readAsText(file);

                // Upload.dataUrl(file, function(base64){
                //   $scope.svgIcon = base64
                // }, true);


                // Upload.upload({
                //     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                //     fields: {
                //         'username': $scope.username
                //     },
                //     file: file
                // }).progress(function (evt) {
                //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //     $scope.log = 'progress: ' + progressPercentage + '% ' +
                //                 evt.config.file.name + '\n' + $scope.log;
                // }).success(function (data, status, headers, config) {
                //     $timeout(function() {
                //         $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                //     });
                // });
            }
        }
    };
  });
